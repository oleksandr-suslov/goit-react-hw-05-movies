// import styles from "./Header.module.css";
import Section from "../Section/Section";
import ImageGallery from "../ImageGallery/ImageGallery";

export default function HomePage({ movie }) {
  return (
    <Section>
      <h1>Trending movie week</h1>

      <ImageGallery
        arr={movie}
        // onClick={toggleShowModal}
        // key={shortid.generate()}
      />
    </Section>
  );
}
