import { useState, useEffect, lazy, Suspense } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

import { toast } from "react-toastify";

import Searchbar from "../components/Searchbar/Searchbar";
import Section from "../components/Section/Section";
import { findingMovie } from "../utility/serviceApi";
import {routes} from '../utility/routes'

const queryString = require('query-string');

const MovieGallery = lazy(() =>
  import("../components/MovieGallery/MovieGallery")
);

export default function MoviePage() {
  const [find, setFind] = useState("");
  const [movies, setMovies] = useState(null);
  //for pagination
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  //====

  // for open last page
  const history = useHistory();
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let oldPage = parsed.page;
  let oldQuery = ""
   if (parsed.query) {
     oldQuery = parsed.query;
  }
    if (oldPage !== page) {
      setPage(oldPage);
      setFind(oldQuery);
    }
    if (oldQuery !== find) {
      setFind(oldQuery);
    }
    //====
  
  useEffect(() => {

    if (find === "") {
      return;
    }
    findingMovie(page, find)
      .then((data) => {
        setMovies(data.results);
        
        //for pagination
        const findTotalPages = Math.ceil(
          data.total_results / data.results.length
        );
        setTotalPage(findTotalPages);
        //====

      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [find, page]);

  const handleFormSubmit = (data) => {
    if (data.trim() === "") {
      setFind("");
    } else {
      setFind(data);
    }
  };
  
  //for pagination
  const handlePageClick = (event) => {
    let selected = event.selected + 1;
    setPage(selected);
    //for open last page
    history.push({ ...location, search: `query=${find}&page=${selected}` });
    //====
  };
  //====

  const { url } = useRouteMatch();
const onGoBack = () => {
    if (location && location.state && location.state.from) {
            history.push(location.state.from);
            return
          }
          history.push(routes.home)
  }
  return (
    <Section>
      <button type="button"
        onClick={onGoBack}
         >
          Go back
        </button>
      <Searchbar onSubmit={handleFormSubmit} />
      <Suspense fallback={<h2>LOADING ...</h2>}>
        {movies && (
          <MovieGallery
            countPage={totalPage} //for pagination
            onClick={handlePageClick} //for pagination
            arr={movies}
            url={url}
                      />
        )}
      </Suspense>

    </Section>
  );
}
