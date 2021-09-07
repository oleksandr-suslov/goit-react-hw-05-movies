import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ item, onClick }) {
  return (
    <li className={styles.ImageGalleryItem} id={item.id}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={styles.ImageGalleryItemImage}
        onClick={(evt) => {
          evt.preventDefault();
          onClick(item.largeImageURL);
        }}
      />
    </li>
  );
}
