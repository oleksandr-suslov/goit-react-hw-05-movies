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
import { serviceApi } from "../../utility/ServiceApi";

// import View from "../View/View";
import styles from "./App.css";

export const finding = {
  TRENDING: "trending",
  SEARCH: "search",
  MOVIE: "movie",
};

export default function App() {
  const [movieTrend, setMovieTrend] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [find, setFind] = useState("");
  // const [images, setImages] = useState([]);
  // const [page, setPage] = useState(1);
  // const [status, setStatus] = useState("resolved");
  // const [showModal, setShowModal] = useState(false);
  // const [showBtn, setShowBtn] = useState(true);

  const handleFormSubmit = (data) => {
    if (data.trim() === "") {
      setFind("");
      // setImages([]);
      // setStatus("idle");
    } else {
      setFind(data);
    }
  };

  useEffect(() => {
    // console.log();
    if (find === "") {
      serviceApi(finding.TRENDING)
        .then((data) => {
          console.log("TRENDING", data);
          setMovieTrend(data.results);
          setMovieSearch([]);

          return;
        })
        .catch((error) => {
          toast.error(error, {
            theme: "colored",
          });
          // setStatus("rejected");
        });
    }

    serviceApi(finding.SEARCH, find)
      .then((data) => {
        console.log("SEARCH", data.results);
        setMovieSearch(data.results);

        // setStatus("resolved");
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
        // setStatus("rejected");
      });

    // if (find !== "") {
    //   setStatus("pending");
    // }
  }, [find]);

  // const onButtonNextPage = () => {
  //   setPage((prevState) => prevState + 1);
  // };

  return (
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage movie={movieTrend} />
        </Route>
        <Route path="/movie" exact>
          <MoviePage movie={movieSearch} onSubmit={handleFormSubmit} />
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
