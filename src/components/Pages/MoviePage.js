import { useState, useEffect, lazy, Suspense } from "react";
import {
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";

import { toast } from "react-toastify";

import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";

const MovieGallery = lazy(() => import("../MovieGallery/MovieGallery"));
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

  const oldLocation = location.search.split("&");
  let oldPage;
  if (oldLocation.length === 2) {
    oldPage = oldLocation[1].split("=")[1];
  }
  const oldQuery = oldLocation[0].split("=")[1] ?? "";
  // console.log("oldPage", oldPage);
  // console.log("oldQuery", oldQuery);

  // console.log("oldLocation", oldLocation);
  // =====
  useEffect(() => {
    //for open last page
    if (oldPage !== page) {
      setPage(oldPage);
      setFind(oldQuery);
    }
    if (oldQuery !== find) {
      setFind(oldQuery);
    }
    //====
    if (find === "") {
      return;
    }
    serviceApi(finding.SEARCH, page, find)
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
  return (
    <Section>
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

      {/* <Route path="/movie?query={find}">
        <MovieGallery arr={movies} url={url} />
      </Route> */}
    </Section>
  );
}
