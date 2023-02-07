import { useState, useEffect } from "react";
import { fetchCommentsByReviewId } from "../utils/api";
import { matchUserImgs } from "../utils/user";
import { fetchUsers } from "../utils/api";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);
  console.log(comments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCommentsByReviewId(review_id), fetchUsers()]).then(
      (result) => {
        const avatarRef = matchUserImgs(result[0], result[1]);
        result[0].forEach((res) => {
          res.avatar = avatarRef[res.author];
        });
        setComments(result[0]);
        setIsLoading(false);
      }
    );
  }, []);
  if (isLoading) {
    return (
      <section>
        <hr className="comment-line" />
        <h1>Loading...</h1>
      </section>
    );
  }
  if (comments.msg === "no comments exist for this id") {
    return (
      <section>
        <hr className="comment-line" />
        <h1 className="comment-title">0 Comments</h1>
      </section>
    );
  } else
    return (
      <section>
        <hr className="comment-line" />
        <h1 className="comment-title">{comments.length} Comments</h1>
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
                    <p className="single-comment-body">{comment.body}</p>
                  </section>
                </section>
              </li>
            );
          })}
        </ul>
      </section>
    );
}
