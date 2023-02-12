import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import Reviews from "./Reviews";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [ascDesc, setAscDesc] = useState("desc");
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(ascDesc);
  // console.log(sortBy);

  useEffect(() => {
    fetchReviews(sortBy, ascDesc).then((fetchedReviews) => {
      setReviews(fetchedReviews);
      setIsLoading(false);
    });
  }, [sortBy, ascDesc]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setSortBy(formJson.sortOptions);
    setSearchParams({ sort_by: sortBy });
  };

  const handleAsc = (event) => {
    event.preventDefault();
    setAscDesc("asc");
    setSearchParams({ sort_by: sortBy, order: "asc" });
  };

  const handleDesc = (event) => {
    event.preventDefault();
    setAscDesc("desc");
    setSearchParams({ sort_by: sortBy, order: "desc" });
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="Reviews">
      <h2 className="header">
        <p>All Reviews:</p>
      </h2>
      <section className="sort-section">
        <form method="GET " className="sort-form" onSubmit={handleSubmit}>
          <label className="sort-label"> Sort by:</label>
          <select
            className="sort-select"
            name="sortOptions"
            defaultValue="created_at"
          >
            <option value="comment_count">Comments</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
          </select>
          <button className="sort-button">Sort</button>
          <button className="arrow" onClick={handleAsc}>
            <AiOutlineArrowUp />
          </button>
          <button className="arrow" onClick={handleDesc}>
            <AiOutlineArrowDown />
          </button>
        </form>
      </section>
      <Reviews reviews={reviews} />
    </main>
  );
}
