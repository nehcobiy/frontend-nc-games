import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import { Link } from "react-router-dom";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(reviews);

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
      <h2>All Reviews</h2>
      <ul className="Reviews_list">
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <ul className="Review">
                <li className="Review_list">
                  <p>
                    <Link
                      className="Review_title"
                      to={`/reviews/${review.review_id}`}
                    >
                      {review.title}
                    </Link>
                  </p>
                  <img
                    className="Review_img"
                    src={`${review.review_img_url}`}
                    alt={`${review.title}`}
                  />
                  <p>Date posted: {review.created_at}</p>
                  <p>Comments: {review.comment_count}</p>
                  <p>Upvotes: {review.votes}</p>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
