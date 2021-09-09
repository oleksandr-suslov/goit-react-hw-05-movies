import MovieGalleryItem from "../MovieGalleryItem/MovieGalleryItem";
import styles from "./MovieGallery.module.css";

export default function MovieGallery({ arr, url }) {
  return (
    <ul className={styles.MovieGallery}>
      {arr.map((item) => (
        <MovieGalleryItem key={item.id} item={item} url={url} />
      ))}
    </ul>
  );
}
