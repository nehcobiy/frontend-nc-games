import "./App.css";
import Nav from "./components/Nav";
import ReviewsList from "./components/ReviewsList";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./components/SingleReview";
import Categories from "./components/Categories";
import { ReviewsByCategory } from "./components/ReviewsByCategory";
import { ErrorPage } from "./components/ErrorPage";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <section className="top">
        <div className="nav-left">
          <h1 className="title">NC Games Reviews</h1>
          <Nav />
        </div>

        <div className="logged-user">
          <Link className="user-link" to="/users">
            <img
              src={user.avatar_url}
              alt={`${user.username}'s profile`}
              id="user-image"
              className="user"
            />
            <p id="user-name" className="user">
              {user.username}
            </p>
          </Link>
        </div>
      </section>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/reviews" element={<ReviewsList />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route
          path="/:category/reviews"
          element={<ReviewsByCategory />}
        ></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
