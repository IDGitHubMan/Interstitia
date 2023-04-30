import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <span>
      <nav className="flex justify-around sticky top-0 z-50 w-full">
        <Link to="/">
          <span>Interstitia</span>
        </Link>
        <Link to="/collection">Collection</Link>
        <Link to="/about">About</Link>
        <Link to="/genera">Genera</Link>
        <Link to="/neuron">Neuron</Link>
        <Link to="/tales">Tales</Link>
      </nav>
    </span>
  );
};

export default Nav;
