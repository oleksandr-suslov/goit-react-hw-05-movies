import { useState, useEffect, lazy } from "react";
import {  useLocation, useHistory } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "../components/Header/Header";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getTrendingMovies } from "../utility/serviceApi";
import Section from "../components/Section/Section";
import styles from "./Pages.module.css";


const queryString = require('query-string');


const MovieGallery = lazy(() =>
  import(
    "../components/MovieGallery/MovieGallery" /* webpackChunkName: "movie-gallery" */
  )
);

export default function HomePage() {
  const url = "/movie"; // нужно исправить


  const [moviesTrend, setMoviesTrend] = useState([]);

  //for pagination
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(1);
  //====
  // for open last page
  const history = useHistory();
  const location = useLocation();
  const parsed = queryString.parse(location.search);
 let oldPage = parsed.page;

  // =====
  useEffect(() => {
    //for open last page if go back
    if (oldPage !== page) {
      setPage(oldPage);
    }
    //====
    getTrendingMovies(page)
      .then((data) => {
        setMoviesTrend(data.results);
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
    let selected = event.selected + 1;
    console.log(event.selected);
    setPage(selected);
    history.push({ ...location, search: `page=${selected}` });
  };
  //====

  return (
    <Section>
      <h2 className={styles.GalleryTitle}>Trending movie week</h2>

      <MovieGallery
        arr={moviesTrend}
        url={url}
        countPage={totalPage}
        onClick={handlePageClick}
        // pageFrom='/'
      />

    </Section>
  );
}
