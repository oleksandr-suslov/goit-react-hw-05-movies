// import styles from "./Header.module.css";
import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section/Section";
import ImageGallery from "../ImageGallery/ImageGallery";

export default function MoviePage({ onSubmit, movie }) {
  return (
    <Section>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        arr={movie}
        // onClick={toggleShowModal}
        // key={shortid.generate()}
      />
    </Section>
  );
}
