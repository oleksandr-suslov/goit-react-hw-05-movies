import { Link, useRouteMatch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";
import styles from "./MoviePage.module.css";

export default function MovieCastPage() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    serviceApi(finding.MOVIE, movieId, "cast")
      .then((data) => {
        setCasts(data.cast);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, []);

  return (
    <Section>
      <h2>Cast</h2>
      {casts &&
        casts.map((cast) => (
          <img
            src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
            alt={cast.name}
            className={styles.CastImg}
          />
        ))}
    </Section>
  );
}
