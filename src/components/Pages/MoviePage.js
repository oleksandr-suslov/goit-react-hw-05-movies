import { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import { toast } from "react-toastify";

import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import MovieGallery from "../MovieGallery/MovieGallery";
import { serviceApi, finding } from "../../utility/ServiceApi";

export default function MoviePage() {
  const [find, setFind] = useState("");
  const [movies, setMovies] = useState([]);
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

      <MovieGallery arr={movies} url={url} />
    </Section>
  );
}
