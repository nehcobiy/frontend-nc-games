import { Link } from "react-router-dom";

export default function Reviews({ reviews }) {
  return (
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
  );
}
