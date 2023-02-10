import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";

import Reviews from "./Reviews";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then((fetchedReviews) => {
      setReviews(fetchedReviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="Reviews">
      <h2 className="header">
        <p>All Reviews:</p>
      </h2>
      <Reviews reviews={reviews} />
    </main>
  );
}
