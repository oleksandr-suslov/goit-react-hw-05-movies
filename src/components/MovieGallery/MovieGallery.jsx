// import { useState, useEffect, lazy, Suspense } from "react";
import ReactPaginate from "react-paginate";
// import { useRouteMatch,Link, useLocation, useHistory } from "react-router-dom";

import MovieGalleryItem from "../MovieGalleryItem/MovieGalleryItem";
import styles from "./MovieGallery.module.css";

export default function MovieGallery({ arr, url,  countPage, onClick, pageFrom }) {

  // const  urlf   = useRouteMatch();
  // console.log("url gallery", urlf);
  // console.log("arr gallery", arr);

  return (
    <div>
      <ul className={styles.MovieGallery}>
        {arr.map((item) => (
         
          <MovieGalleryItem item={item} url={url}/>
          
        ))}
      </ul>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={countPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(event) => {
          console.log("event", event);
          onClick(event);
        }}
        disableInitialCallback={true}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
