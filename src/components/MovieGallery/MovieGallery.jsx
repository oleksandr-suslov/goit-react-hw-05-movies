import ReactPaginate from "react-paginate";

import MovieGalleryItem from "../MovieGalleryItem/MovieGalleryItem";
import styles from "./MovieGallery.module.css";

export default function MovieGallery({ arr, url,  countPage, onClick, pageFrom }) {

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
              onClick(event);
        }}
        disableInitialCallback={true}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
