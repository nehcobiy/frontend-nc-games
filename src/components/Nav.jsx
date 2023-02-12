import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <div className="Nav">
        <Link className="Nav_link" to="/">
          Home
        </Link>
        <Link className="Nav_link" to="/reviews">
          Reviews
        </Link>
        <Link className="Nav_link" to="/categories">
          Categories
        </Link>
      </div>
    </nav>
  );
}
