import Section from "../Section/Section";
import MovieGallery from "../MovieGallery/MovieGallery";

export default function HomePage({ movie }) {
  const url = "/movie"; // нужно исправить

  return (
    <Section>
      <h1>Trending movie week</h1>
      <MovieGallery arr={movie} url={url} />
    </Section>
  );
}
