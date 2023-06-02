import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <span className="w-full">
      <nav className="flex justify-around sticky top-0 z-50 w-full">
        <Link to="/">
          <span>Interstitia</span>
        </Link>
        <Link to="/genera">Genera</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/about">About</Link>
      </nav>
    </span>
  );
};

export default Nav;
