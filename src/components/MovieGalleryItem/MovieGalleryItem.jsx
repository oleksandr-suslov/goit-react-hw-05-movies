import {  Link,useLocation } from "react-router-dom";

import styles from "./MovieGalleryItem.module.css";

export default function MovieGalleryItem({ item, url }) {
  // const history = useHistory();
  const location = useLocation();
 
  return (
    <li className={styles.MovieGalleryItem} key={item.id}>
      <Link
        to={{
          pathname: `${url}/${item.id}`, state: {from: location}}}
            >
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          alt={item.tags}
          className={styles.MovieGalleryItemImage}
        />
         </Link>
    </li>
  );
}
