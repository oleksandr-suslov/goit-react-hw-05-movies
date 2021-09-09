// import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route, useParams } from "react-router-dom";
import MovieCastPage from "../Pages/MovieCastPage";
import MovieReviewsPage from "../Pages/MovieReviewsPage";
// import { ToastContainer, toast } from "react-toastify";
// import { serviceApi } from "../../utility/ServiceApi";
import Section from "../Section/Section";
// import { finding } from "../App/App";
// import styles from "./Pages.module.css";

export default function MovieDetailsPage({ movie, onClick, info }) {
  // const { movieId } = useParams();
  const { url } = useRouteMatch();
  console.log("info", info);
  return (
    <Section>
      <h2>{movie.original_title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt="movie.original_title"
      />
      <p>{movie.overview}</p>
      <Link
        to={`${url}/cast`}
        onClick={() => {
          onClick("cast");
        }}
      >
        Cast
      </Link>
      <Link
        to={`${url}/reviews`}
        onClick={() => {
          onClick("reviews");
        }}
      >
        Reviews
      </Link>

      <Route path="/movie/:movieId/cast">
        <MovieCastPage info={info} />
      </Route>

      <Route path="/movie/:movieId/reviews">
        <MovieReviewsPage info={info} />
      </Route>
    </Section>
  );
}
