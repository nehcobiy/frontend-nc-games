import "./App.css";
import Nav from "./components/Nav";
import ReviewsList from "./components/ReviewsList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="Title">NC Games Reviews</h1>
      <Nav />

      <Routes>
        <Route path="/reviews" element={<ReviewsList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
