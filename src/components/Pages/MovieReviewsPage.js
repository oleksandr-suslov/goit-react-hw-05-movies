import { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Section from "../Section/Section";
import { serviceApi, finding } from "../../utility/ServiceApi";
import styles from "./MoviePage.module.css";

export default function MovieReviewsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    serviceApi(finding.MOVIE, movieId, "reviews")
      .then((data) => {
        console.log("MOVIE showCastOrReviews", data);
        setReviews(data.results);
      })
      .catch((error) => {
        toast.error(error, {
          theme: "colored",
        });
      });
  }, []);

  return (
    <Section>
      <h2>Reviews</h2>
      {reviews &&
        reviews.map((item) => (
          <div>
            <h3>{item.author}</h3>
            <p>{item.content}</p>
          </div>
        ))}
    </Section>
  );
}
