import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
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

  //for pagination
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  //====
  // for open last page
  const history = useHistory();
  const location = useLocation();

  const oldLocation = location.search;
  let oldPage = oldLocation.split("=")[1];

  // console.log("oldPage", oldPage);
  // console.log("oldLocation", oldLocation);
  // =====
  useEffect(() => {
    //for open last page
    if (oldPage !== page) {
      setPage(oldPage);
    }
    //====
    serviceApi(finding.TRENDING, page)
      .then((data) => {
        setMovieTrend(data.results);
        //for pagination
        const findTotalPages = Math.ceil(
          data.total_results / data.results.length
        );
        setTotalPage(findTotalPages);
        //====
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [page]);

  //for pagination
  const handlePageClick = (event) => {
    console.log(event.selected);
    let selected = event.selected + 1;
    setPage(selected);
    history.push({ ...location, search: `page=${selected}` });
  };
  //====
  return (
    <div className={styles.App}>
      <Header />
      <Suspense fallback={<h2>LOADING ...</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage
              movie={movieTrend}
              countPage={totalPage} //for pagination
              onClick={handlePageClick} //for pagination
              page={page}
            />
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
