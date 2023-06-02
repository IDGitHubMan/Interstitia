import TestP5 from "./404Stars";
import Nav from "./Nav";
export const NotFound = () => {
  return (
    <div className="align-center text-center fixed top-0 left-0 w-full">
      <div className="align-center text-white z-10 relative text404">
        <h1 className="text-9xl tex">404</h1>
        <h1 className="text-7xl">You seem to be lost.</h1>
        <p className="text-xl">
          There's nothing here yet. There might be in some time though.
        </p>
      </div>
      <Nav />
      <TestP5 />
    </div>
  );
};

export default NotFound;
