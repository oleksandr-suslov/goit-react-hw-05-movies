import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

import Section from "../Section/Section";
import { getCastDetails } from "../../utility/serviceApi";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  useEffect(() => {
    getCastDetails(movieId)
      .then((data) => {
        setCasts(data.cast);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [movieId]);

  return (
    <Section>
      {/* <h2>Cast</h2> */}
      <ul className={styles.CastBox}>
        {casts &&
          casts.map((cast) => (
            <li className={styles.Cast} key={cast.id }>
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className={styles.CastImg}
              />
              <p>{cast.name}</p>
            </li>
          ))}
      </ul>
    </Section>
  );
}
