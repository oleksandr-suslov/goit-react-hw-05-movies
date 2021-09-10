import { useState, useEffect, lazy, Suspense } from "react";
import {
  Link,
  useRouteMatch,
  Route,
  useParams,
  Switch,
} from "react-router-dom";

import { toast } from "react-toastify";

import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";
import styles from "./Pages.module.css";

const MovieCastPage = lazy(() => import("../Pages/MovieCastPage"));
const MovieReviewsPage = lazy(() => import("../Pages/MovieReviewsPage"));
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
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
  }, [movieId]);

  return (
    <Section>
      {movie && (
        <div className={styles.MovieWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt="movie.original_title"
            className={styles.MovieImg}
          />
          <div>
            <h2 className={styles.MovieTitle}>{movie.original_title}</h2>
            <p className={styles.MovieTitle}>Overview</p>
            <p className={styles.MovieOverview}>{movie.overview}</p>
            <p className={styles.MovieTitle}>Genres</p>
            <div className={styles.MovieTitleWrap}>
              {movie.genres &&
                movie.genres.map((item) => (
                  <p className={styles.MovieOverview} key={item.id}>
                    {item.name}
                  </p>
                ))}
            </div>
            <p className={styles.MovieTitle}>Budget</p>
            <p className={styles.MovieOverview}>{movie.budget} $</p>
          </div>
        </div>
      )}
      <div className={styles.Link}>
        <h2 className={styles.MovieTitle}>Addition information</h2>
        <ul className={styles.MovieTitle}>
          <li>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<h2>LOADING ...</h2>}>
        <Switch>
          <Route path="/movie/:movieId/cast">
            <MovieCastPage />
          </Route>

          <Route path="/movie/:movieId/reviews">
            <MovieReviewsPage />
          </Route>
        </Switch>
      </Suspense>
    </Section>
  );
}
