import { useRouteMatch, Link,useLocation, useHistory } from "react-router-dom";

import styles from "./MovieGalleryItem.module.css";

export default function MovieGalleryItem({ item, url }) {
  // const  url   = useRouteMatch();
  // console.log("url gallery", url);
  return (
    <li className={styles.MovieGalleryItem} key={item.id}>
      <Link
        to={`${url}/${item.id}`}
      // to={{ pathname: `${url}/${item.id}`, state: { from: `${url}` } }}
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
