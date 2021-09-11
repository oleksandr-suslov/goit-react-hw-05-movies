import ReactPaginate from "react-paginate";

import MovieGalleryItem from "../MovieGalleryItem/MovieGalleryItem";
import styles from "./MovieGallery.module.css";

export default function MovieGallery({ arr, url, countPage, onClick, page }) {
  return (
    <div>
      <ul className={styles.MovieGallery}>
        {arr.map((item) => (
          <MovieGalleryItem key={item.id} item={item} url={url} />
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
        // onPageActive={page}
        onPageChange={(event) => {
          onClick(event);
        }}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
