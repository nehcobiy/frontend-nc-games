import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchUsers } from "../utils/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
      setIsLoading(false);
    });
  });

  const handleClick = (event) => {
    event.preventDefault();
    const clickedUsername = event.target.value;
    const clickedUser = users.filter((user) => {
      return user.username === clickedUsername;
    });
    setUser(clickedUser[0]);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <section>
      <h2 className="users-header">Select user: </h2>
      <form className="users-form">
        {users.map((user) => {
          return (
            <section key={user.username} className="single-user">
              <label htmlFor={user.username} className="single-username">
                {user.username}
              </label>
              <input
                type="image"
                src={user.avatar_url}
                alt={`${user.username}'s profile`}
                className="single-user-img"
                value={user.username}
                onClick={handleClick}
              />
            </section>
          );
        })}
      </form>
    </section>
  );
}
