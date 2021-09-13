import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Section from "../Section/Section";
import { getReviewsDetails } from "../../utility/serviceApi";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviewsDetails(movieId)
      .then((data) => {
        setReviews(data.results);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, [movieId]);

  return (
    <Section>
      <ul className={styles.ReviewsBox}>
        {reviews &&
          reviews.map((item) => (
            <li className={styles.ReviewsBox} key={item.id}>
              <h3 className={styles.ReviewsAuthor}>{item.author}</h3>
              <p className={styles.ReviewsText}>{item.content}</p>
            </li>
          ))}
        {reviews.length === 0 && (
          <p className={styles.ReviewsAuthor}>No information</p>
        )}
      </ul>
    </Section>
  );
}
