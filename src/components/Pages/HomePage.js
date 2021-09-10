// import ReactPaginate from "react-paginate";
import { lazy } from "react";

import Section from "../Section/Section";
import styles from "./Pages.module.css";

const MovieGallery = lazy(() =>
  import("../MovieGallery/MovieGallery" /* webpackChunkName: "movie-gallery" */)
);
export default function HomePage({ movie }) {
  const url = "/movie"; // нужно исправить

  return (
    <Section>
      <h2 className={styles.GalleryTitle}>Trending movie week</h2>
      <MovieGallery arr={movie} url={url} />
      {/* <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        // pageCount={this.state.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        // onPageChange={this.handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      /> */}
    </Section>
  );
}
