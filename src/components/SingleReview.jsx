import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewById } from "../utils/api";
import Comments from "./Comments";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { patchReviewVotes } from "../utils/api";

export default function SingleReview() {
  const { review_id } = useParams();
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [voteChange, setVoteChange] = useState(0);
  // console.log(review);

  useEffect(() => {
    fetchReviewById(review_id).then((fetchedReview) => {
      setReview(fetchedReview);
      setIsLoading(false);
    });
  }, []);

  const upVote = () => {
    const updatedReview = { ...review };
    updatedReview.votes++;
    setVoteChange(-1);
    setReview(updatedReview);
    patchReviewVotes(review.review_id, 1).catch((err) => {
      setVoteChange(0);
      return alert("error: unable to vote");
    });
  };

  const downVote = () => {
    const updatedReview = { ...review };
    updatedReview.votes--;
    setVoteChange(0);
    setReview(updatedReview);
    patchReviewVotes(review.review_id, -1).catch((err) => {
      setVoteChange(0);
      return alert("error: unable to vote");
    });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="single-review">
      <section className="single-review-img-title">
        <h1 className="single-review_title">{review.title}</h1>{" "}
        <img
          src={review.review_img_url}
          alt="related to game"
          className="single-review-img"
        />
      </section>
      <section className="single-review-body">
        <p>{review.review_body}</p>
        <section className="single-review-posted-container">
          <h2 className="single-review-posted">Posted by:&nbsp;</h2>
          <p className="single-review-posted"> {review.owner}</p>
        </section>
        <section className="single-review-designer-container">
          <h2 className="single-review-designer">Designed by:&nbsp;</h2>
          <p className="single-review-designer"> {review.designer}</p>
        </section>
        <section className="single-review-category-container">
          <h2 className="single-review-category">Category:&nbsp;</h2>
          <p className="single-review-category"> {review.category}</p>
        </section>
        <section className="single-review-date-containerr">
          <h2 className="single-review-date">Posted on:&nbsp;</h2>
          <p className="single-review-date"> {review.created_at}</p>
        </section>
        <section className="single-review-votes-container">
          <h2 className="single-review-votes">Upvotes:&nbsp;</h2>
          <p className="single-review-votes">
            {review.votes}{" "}
            <button
              className="thumb"
              onClick={upVote}
              disabled={voteChange === -1}
            >
              <FaThumbsUp />
            </button>
            <button
              className="thumb"
              onClick={downVote}
              disabled={voteChange === 0}
            >
              <FaThumbsDown />
            </button>
          </p>
        </section>
      </section>
      <section className="comments">
        <Comments review_id={review_id} />
      </section>
    </main>
  );
}
