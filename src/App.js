import "./App.css";
import Nav from "./components/Nav";
import ReviewsList from "./components/ReviewsList";
import { Routes, Route } from "react-router-dom";
import SingleReview from "./components/SingleReview";
import Comments from "./components/Comments";

function App() {
  return (
    <div className="App">
      <h1 className="title">NC Games Reviews</h1>
      <Nav />

      <Routes>
        <Route path="/reviews" element={<ReviewsList />}></Route>
        <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
