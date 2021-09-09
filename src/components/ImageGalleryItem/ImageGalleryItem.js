import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ item, getId }) {
  // const KEY = "f563ae14d0dd21bfc240b1890e6683c0";
  return (
    <li className={styles.ImageGalleryItem} key={item.id}>
      <img
        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
        alt={item.tags}
        className={styles.ImageGalleryItemImage}
        onClick={(evt) => {
          evt.preventDefault();
          getId(item.id);
        }}
      />
    </li>
  );
}
