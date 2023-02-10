import Reviews from "./Reviews";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchReviews } from "../utils/api";

export function ReviewsByCategory() {
  const { category } = useParams();
  const [reviewsByCategory, setReviewsByCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then((fetchedReviews) => {
      const reviewsOfCategory = [];
      fetchedReviews.forEach((fetchedReview) => {
        if (fetchedReview.category === category) {
          reviewsOfCategory.push(fetchedReview);
        }
        setReviewsByCategory(reviewsOfCategory);
        setIsLoading(false);
      });
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
      <Reviews reviews={reviewsByCategory} />;
    </section>
  );
}
