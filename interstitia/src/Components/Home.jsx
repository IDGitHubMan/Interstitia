import { Link } from "react-router-dom";
import Nav from "./Nav";

export const Home = () => {
  return (
    <div>
      <Nav />
      <div class="bodySection flex justify-center align-middle items-center">
        <div class="bodyText flex text-center align-middle justify-center rounded-md h-full w-1/2 flex-col items-center">
          <p class="text-3xl">
            Interstitia seeks to explore the spaces between disciplines with
            explorative projects, whatever form that may take.
          </p>
          <Link to="/collection">
            <div class="buttonLink w-max p-3 rounded-md text-black">
              <p>View Our Collection</p>
            </div>
          </Link>
        </div>
        <div class="previewSlides">
          <img id="previewImage" src="" width="" height="" alt="" />
        </div>
      </div>
      <div class="bodySection flex justify-center align-middle items-center">
        <div class="bodyText flex text-center align-middle justify-center rounded-md h-full w-1/2 flex-col items-center">
          <p class="text-3xl">
            We are a team of multipotential people from many backgrounds, each
            with their own stories and ideas to tell and share.
          </p>
          <Link to="/about">
            <div class="buttonLink w-max p-3 rounded-md text-black">
              <p>Meet our Team</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
