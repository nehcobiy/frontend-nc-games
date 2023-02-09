import { useState, useEffect } from "react";
import { fetchCommentsByReviewId } from "../utils/api";
import { matchUserImgs } from "../utils/user";
import { fetchUsers } from "../utils/api";
import { FaThumbsUp } from "react-icons/fa";
import NewComment from "./NewComment";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchCommentsByReviewId(review_id), fetchUsers()])
      .then((result) => {
        const avatarRef = matchUserImgs(result[1]);
        result[0].forEach((res) => {
          res.avatar = avatarRef[res.author];
        });
        setComments(result[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return (
      <section>
        <hr className="comment-line" />
        <h1>Loading...</h1>
      </section>
    );
  }
  if (error) {
    return (
      <section>
        <hr className="comment-line" />
        <h1 className="comment-title">0 Comments</h1>
        <NewComment comments={comments} setComments={setComments} />
      </section>
    );
  } else
    return (
      <section>
        <hr className="comment-line" />
        <h1 className="comment-title">{comments.length} Comments</h1>
        <NewComment comments={comments} setComments={setComments} />
        <ul className="comment-list">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="single-comment-container">
                <section className="single-comment">
                  <img
                    src={comment.avatar}
                    alt={`${comment.username}'s profile`}
                    key={comment.comment_id}
                    className="user-avatar"
                  />

                  <section className="single-comment-text">
                    <h3 className="single-comment-header-container">
                      <p className="single-comment-header">
                        {comment.author}&nbsp;
                      </p>
                      <p
                        className="single-comment-header"
                        id="single-comment-date"
                      >
                        {`${comment.created_at.slice(0, 10)} 
                      ${comment.created_at.slice(11, 16)}`}
                      </p>
                    </h3>
                    <section className="single-comment-body-container">
                      <p className="single-comment-body" id="h"></p>
                      {comment.body} &nbsp;
                      <span className="single-comment-body" id="comment-thumb">
                        {comment.votes} <FaThumbsUp />
                      </span>
                    </section>
                  </section>
                </section>
              </li>
            );
          })}
        </ul>
      </section>
    );
}
