import { useState, useEffect } from "react";
import { fetchCategories, fetchReviews } from "../utils/api";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <section className="categories">
      <form className="categories-form">
        <p className="categories-title">Select category:</p>
        <ul className="categories-list">
          {categories.map((category) => {
            return (
              <li className="category-list-item" key={category}>
                <Link className="category-link" to={`/${category}/reviews`}>
                  <button className="category">{category}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </form>
    </section>
  );
}
