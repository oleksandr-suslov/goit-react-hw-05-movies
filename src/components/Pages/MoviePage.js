// import styles from "./Header.module.css";
import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Link, useRouteMatch } from "react-router-dom";
// import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
// import styles from "./MoviePage.module.css";

export default function MoviePage({ onSubmit, movie, onClick }) {
  const { url } = useRouteMatch();
  // const url = "/movie";
  return (
    <Section>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery arr={movie} onClick={onClick} url={url} />
    </Section>
  );
}
