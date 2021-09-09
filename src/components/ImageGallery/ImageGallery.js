// import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ arr, onClick }) {
  const match = useRouteMatch();
  // const [movie, useMovie] = useState(null);
  return (
    <ul className={styles.ImageGallery}>
      {arr.map((item) => (
        <Link to={`/movie/${item.id}`}>
          <ImageGalleryItem key={item.id} item={item} onClick={onClick} />
        </Link>
      ))}
    </ul>
  );
}
