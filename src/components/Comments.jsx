import { useState, useEffect, useContext } from "react";
import {
  deleteCommentByCommentId,
  fetchCommentsByReviewId,
} from "../utils/api";
import { matchUserImgs } from "../utils/user";
import { fetchUsers } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { FaThumbsUp } from "react-icons/fa";
import NewComment from "./NewComment";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user } = useContext(UserContext);

  console.log(user);

  useEffect(() => {
    Promise.all([fetchCommentsByReviewId(review_id), fetchUsers()])
      .then((result) => {
        const avatarRef = matchUserImgs(result[1]);
        result[0].forEach((res) => {
          res.avatar = avatarRef[res.author];
        });
        setComments(result[0]);
        setIsLoading(false);
        setDeleted(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [deleted]);

  const handleClick = (event) => {
    event.preventDefault();

    const commentsCopy = [...comments];
    commentsCopy.shift();
    setComments(commentsCopy);

    setDeleting(true);
    setDeleted(false);

    deleteCommentByCommentId(event.target.value)
      .then(() => {
        setDeleting(false);
        setDeleted(true);
      })
      .catch((err) => {
        setDeleted(false);
        return alert("error: unable to delete comment");
      });
  };
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
        <p
          className="comment-posting"
          hidden={deleting === true ? false : true}
        >
          Deleting...
        </p>
        <p hidden={deleted === true ? false : true}>Comment was deleted.</p>
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
                      <button
                        className="delete-comment"
                        value={comment.comment_id}
                        onClick={handleClick}
                        hidden={comment.author === user.username ? false : true}
                        disabled={deleting === true}
                      >
                        Delete
                      </button>
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
