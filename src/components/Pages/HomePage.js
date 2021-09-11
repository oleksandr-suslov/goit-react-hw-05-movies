import { lazy } from "react";

import Section from "../Section/Section";
import styles from "./Pages.module.css";

const MovieGallery = lazy(() =>
  import("../MovieGallery/MovieGallery" /* webpackChunkName: "movie-gallery" */)
);

export default function HomePage({ movie, countPage, onClick, page }) {
  const url = "/movie"; // нужно исправить

  return (
    <Section>
      <h2 className={styles.GalleryTitle}>Trending movie week</h2>
      <MovieGallery
        arr={movie}
        url={url}
        countPage={countPage}
        onClick={onClick}
        page={page}
      />
    </Section>
  );
}
