// import styles from "./Header.module.css";
import Section from "../Section/Section";
import ImageGallery from "../ImageGallery/ImageGallery";
// import { Link, useRouteMatch } from "react-router-dom";

export default function HomePage({ movie, onClick }) {
  // const urls = useRouteMatch();
  // console.log("urls", urls);
  const url = "/movie"; // нужно исправить

  return (
    <Section>
      <h1>Trending movie week</h1>

      <ImageGallery arr={movie} onClick={onClick} url={url} />
    </Section>
  );
}
