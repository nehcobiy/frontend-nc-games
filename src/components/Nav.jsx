import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="Nav">
      <Link className="Nav_link" to="/">
        Home
      </Link>
      <Link className="Nav_link" to="/categories">
        Categories
      </Link>
      <Link className="Nav_link" to="/myreviews">
        My Reviews
      </Link>
    </nav>
  );
}
