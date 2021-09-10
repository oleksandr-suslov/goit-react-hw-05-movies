import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { serviceApi, finding } from "../../utility/ServiceApi";

import styles from "./App.css";

const NotFoundPage = lazy(() => import("../Pages/NotFoundPage"));
const HomePage = lazy(() => import("../Pages/HomePage"));
const MoviePage = lazy(() => import("../Pages/MoviePage"));
const MovieDetailsPage = lazy(() => import("../Pages/MovieDetailsPage"));

export default function App() {
  const [movieTrend, setMovieTrend] = useState([]);

  useEffect(() => {
    serviceApi(finding.TRENDING)
      .then((data) => {
        setMovieTrend(data.results);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <Suspense fallback={<h2>LOADING ...</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage movie={movieTrend} />
          </Route>

          <Route path="/movie" exact>
            <MoviePage />
          </Route>

          <Route path="/movie/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
