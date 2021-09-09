// import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ arr, onClick, url }) {
  //   const match = useRouteMatch();
  // const [movie, useMovie] = useState(null);
  return (
    <ul className={styles.ImageGallery}>
      {arr.map((item) => (
        <Link to={`${url}/${item.id}`}>
          <ImageGalleryItem key={item.id} item={item} getId={onClick} />
        </Link>
      ))}
    </ul>
  );
}
