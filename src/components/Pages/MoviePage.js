import { useState, useEffect, lazy, Suspense } from "react";
import { useRouteMatch, Route } from "react-router-dom";

import { toast } from "react-toastify";

import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";

const MovieGallery = lazy(() => import("../MovieGallery/MovieGallery"));
export default function MoviePage() {
  const [find, setFind] = useState("");
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    serviceApi(finding.SEARCH, find)
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [find]);

  const handleFormSubmit = (data) => {
    if (data.trim() === "") {
      setFind("");
    } else {
      setFind(data);
    }
  };
  const { url } = useRouteMatch();
  return (
    <Section>
      <Searchbar onSubmit={handleFormSubmit} />
      <Suspense fallback={<h2>LOADING ...</h2>}>
        {movies && <MovieGallery arr={movies} url={url} />}
      </Suspense>

      {/* <Route path="/movie?query={find}">
        <MovieGallery arr={movies} url={url} />
      </Route> */}
    </Section>
  );
}
