import { useState, useEffect, lazy, Suspense } from "react";
import {
  Link,
  useRouteMatch,
  Route,
  useParams,
  Switch, useLocation, useHistory
  
} from "react-router-dom";

import { toast } from "react-toastify";

import Section from "../components/Section/Section";
import { getMovieDetails } from "../utility/serviceApi";
import styles from "./Pages.module.css";
import {routes} from '../utility/routes'

const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId)
        .then(setMovie)
        .catch((error) => {
          toast.error(error, {
            theme: "colored",
          });
        });
    }
  }, [movieId]);
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
            <Link to={{pathname:`${url}/cast`, state:{from: location && location.state && location.state.from?location.state.from:routes.home}}}>Cast</Link>
          </li>
          <li>
            <Link to={{pathname:`${url}/reviews`, state:{from: location && location.state && location.state.from?location.state.from:routes.home}}}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<h2>LOADING ...</h2>}>
        <Switch>
          <Route path="/movie/:movieId/cast" exact>
            <MovieCast />
          </Route>

          <Route path="/movie/:movieId/reviews" exact>
            <MovieReviews />
          </Route>
        </Switch>
      </Suspense>
    </Section>
  );
}
