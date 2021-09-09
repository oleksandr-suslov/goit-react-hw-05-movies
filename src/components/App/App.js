import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import NotFoundPage from "../Pages/NotFoundPage";
import HomePage from "../Pages/HomePage";
import MoviePage from "../Pages/MoviePage";
import MovieDetailsPage from "../Pages/MovieDetailsPage";
import Header from "../Header/Header";
import { serviceApi, finding } from "../../utility/ServiceApi";

import styles from "./App.css";

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

      <ToastContainer autoClose={3000} />
    </div>
  );
}
