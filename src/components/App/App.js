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

import styles from "./App.css";

export const finding = {
  TRENDING: "trending",
  SEARCH: "search",
  MOVIE: "movie",
};

export default function App() {
  const [movieTrend, setMovieTrend] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [find, setFind] = useState("");
  const [movieId, setMovieId] = useState(null);
  // const [page, setPage] = useState(1);
  const [aboutMovie, setAboutMovie] = useState(false);
  const [showCastOrReviews, setCastOrReviews] = useState(false);
  // const [showBtn, setShowBtn] = useState(true);

  const handleFormSubmit = (data) => {
    if (data.trim() === "") {
      setFind("");
    } else {
      setFind(data);
    }
  };
  const getMovieId = (id) => {
    setMovieId(id);
  };
  const toggleCastOrReviews = (data) => {
    setCastOrReviews(data);
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
        });
    }
    if (movieId) {
      serviceApi(finding.MOVIE, movieId)
        .then((data) => {
          console.log("MOVIE details", data);
          setMovieDetails(data);
        })
        .catch((error) => {
          toast.error(error, {
            theme: "colored",
          });
        });
    }

    if (showCastOrReviews) {
      serviceApi(finding.MOVIE, movieId, showCastOrReviews)
        .then((data) => {
          console.log("MOVIE showCastOrReviews", data);
          setAboutMovie(data);
          return;
        })
        .catch((error) => {
          toast.error(error, {
            theme: "colored",
          });
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
  }, [find, movieId, showCastOrReviews]);

  // const onButtonNextPage = () => {
  //   setPage((prevState) => prevState + 1);
  // };

  return (
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage movie={movieTrend} onClick={getMovieId} />
        </Route>

        <Route path="/movie" exact>
          <MoviePage
            movie={movieSearch}
            onSubmit={handleFormSubmit}
            onClick={getMovieId}
          />
        </Route>

        <Route path="/movie/:movieId">
          <MovieDetailsPage
            info={aboutMovie}
            movie={movieDetails}
            onClick={toggleCastOrReviews}
          />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      <ToastContainer autoClose={3000} />
    </div>
  );
}
