import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ arr, onClick, key }) {
  return (
    <ul className={styles.ImageGallery} key={key}>
      {arr.map((item) => (
        <ImageGalleryItem item={item} onClick={onClick} />
      ))}
    </ul>
  );
}
