import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviewsByCategory } from "../utils/api";

export function ReviewsByCategory() {
  const { category } = useParams();
  const [reviewsByCategory, setReviewsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviewsByCategory(category).then((fetchedReviews) => {
      console.log(fetchedReviews);
      setReviewsByCategory(fetchedReviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <section>
      <h2 className="header">
        <p>Category: {category}</p>
      </h2>
      <Reviews reviews={reviewsByCategory} />
    </section>
  );
}
