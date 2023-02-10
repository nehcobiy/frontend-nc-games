import "./App.css";
import Nav from "./components/Nav";
import ReviewsList from "./components/ReviewsList";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./components/SingleReview";
import Categories from "./components/Categories";
import { ReviewsByCategory } from "./components/ReviewsByCategory";
function App() {
  return (
    <div className="App">
      <section className="top">
        <h1 className="title">NC Games Reviews</h1>
        <Nav />
      </section>

      <Routes>
        <Route path="/" element={<ReviewsList />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route
          path="/:category/reviews"
          element={<ReviewsByCategory />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
