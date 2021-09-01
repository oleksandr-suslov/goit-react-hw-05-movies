import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ arr, onClick }) {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem items={arr} onClick={onClick} />
    </ul>
  );
}
