import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById } from "../utils/api";

export default function SingleReview() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log(review);

  useEffect(() => {
    fetchReviewById(review_id).then((fetchedReview) => {
      setReview(fetchedReview);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="SingleReview">
      <section className="SingleReview_img_title">
        <h1 clasName="SingleReview_title">{review.title}</h1>{" "}
        <img
          src={review.review_img_url}
          alt="related to game"
          className="SingleReview_img"
        />
      </section>
      <section className="SingleReview_body">
        {/* <h2>Review:</h2> */}
        <p>{review.review_body}</p>
        <section className="SingleReview_posted_container">
          <h2 className="SingleReview_posted">Posted by:&nbsp;</h2>
          <p className="SingleReview_posted"> {review.owner}</p>
        </section>
        <section className="SingleReview_designer_container">
          <h2 className="SingleReview_designer">Designed by:&nbsp;</h2>
          <p className="SingleReview_designer"> {review.designer}</p>
        </section>
        <section className="SingleReview_category_container">
          <h2 className="SingleReview_category">Category:&nbsp;</h2>
          <p className="SingleReview_category"> {review.category}</p>
        </section>
        <section className="SingleReview_date_container">
          <h2 className="SingleReview_date">Posted on:&nbsp;</h2>
          <p className="SingleReview_date"> {review.created_at}</p>
        </section>
      </section>
    </main>
  );
}
