// import styles from "./Header.module.css";
import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Link, useRouteMatch } from "react-router-dom";
// import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
// import styles from "./MoviePage.module.css";

export default function MoviePage({ info }) {
  const { url } = useRouteMatch();
  console.log(info);
  // const url = "/movie";
  return (
    <Section>
      <h2>Reviews</h2>
    </Section>
  );
}
