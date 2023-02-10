import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { fetchUsers, postComment } from "../utils/api";
import { matchUserImgs } from "../utils/user";
import { TiTick } from "react-icons/ti";

export default function NewComment({ setComments }) {
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [posted, setPosted] = useState(false);
  const [posting, setPosting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPosting(true);
    Promise.all([postComment(review_id, newComment), fetchUsers()])
      .then((result) => {
        const avatarRef = matchUserImgs(result[1]);
        result[0].avatar = avatarRef[result[0].author];
        setComments((currComments) => {
          return [result[0], ...currComments];
        });
        setPosted(true);
        setPosting(false);
        return result[0];
      })
      .then(() => {
        setNewComment("");
      });
  };
  return (
    <form className="new-comment" onSubmit={handleSubmit}>
      <img
        src={user.avatar_url}
        alt={`${user.username}'s profile`}
        className="user-profile"
      />
      <textarea
        id="comment-box"
        value={newComment}
        placeholder="Write your comment..."
        required
        onChange={(event) => {
          setNewComment(event.target.value);
          setPosted(false);
        }}
      ></textarea>
      <button
        id="submit-comment"
        disabled={posted === true || posting === true}
      >
        Submit
      </button>
      <p id="successful-comment" hidden={posted === false}>
        <TiTick id="tick" size={40} color="green" />
        Your comment was posted successfully!
      </p>
      <p id="comment-posting" hidden={posting === false}>
        Your comment is posting...
      </p>
    </form>
  );
}
