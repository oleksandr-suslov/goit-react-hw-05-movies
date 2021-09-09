import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import MovieCastPage from "../Pages/MovieCastPage";
import MovieReviewsPage from "../Pages/MovieReviewsPage";
import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  useEffect(() => {
    if (movieId) {
      serviceApi(finding.MOVIE, movieId)
        .then(setMovie)
        .catch((error) => {
          toast.error(error, {
            theme: "colored",
          });
        });
    }
  }, []);

  return (
    <Section>
      <h2>{movie.original_title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt="movie.original_title"
      />
      <p>{movie.overview}</p>
      <Link to={`${url}/cast`}>Cast</Link>
      <Link to={`${url}/reviews`}>Reviews</Link>

      <Route path="/movie/:movieId/cast">
        <MovieCastPage info={"cast"} />
      </Route>

      <Route path="/movie/:movieId/reviews">
        <MovieReviewsPage info={"reviews"} />
      </Route>
    </Section>
  );
}
