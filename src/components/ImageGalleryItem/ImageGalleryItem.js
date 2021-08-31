import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ items }) {
  return items.map((item) => (
    <li className={styles.ImageGalleryItem} key={item.id}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  ));
}
