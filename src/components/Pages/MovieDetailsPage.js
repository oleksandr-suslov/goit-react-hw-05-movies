import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { serviceApi } from "../../utility/ServiceApi";
import { finding } from "../App/App";
// import styles from "./Pages.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    serviceApi(finding.MOVIE, movieId)
      .then(setMovie)
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [movieId]);
  return (
    <div>
      <h2>{movie.original_title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt="movie.original_title"
      />
      <p>{movie.overview}</p>
    </div>
  );
}
