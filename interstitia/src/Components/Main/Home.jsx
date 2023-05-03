import Nav from "./Nav";
import Preview from "./HomeAnim";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const [slide, setSlide] = useState(0);
  const slideContent = [
    {
      text: "Create and share beautiful generative art",
      linkText: "Go to Genera",
      linkDestination: "/genera",
    },
    {
      text: "Explore our projects, whatever form they may take",
      linkText: "View Our Collection",
      linkDestination: "/collection",
    },
    {
      text: "Learn about our stories and ideas",
      linkText: "Meet our Team",
      linkDestination: "/about",
    },
  ];
  clearInterval();
  useEffect(() => {
    setInterval(() => {
      if (slide + 1 >= slideContent.length) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }, 10000);
  }, [slide]);
  return (
    <div>
      <div className="absolute top-0 left-0 w-full">
        <Preview />
      </div>
      <div className="absolute top-0 left-0 w-full">
        <Nav />
        <div className="flex">
          <div className="bodySection flex justify-center align-middle items-center active">
            <div className="bodyText flex text-center align-middle justify-center rounded-md h-full flex-col items-center active">
              <p className="text-3xl">{slideContent[slide].text}</p>
              <div className="buttonLink p-3 rounded-md text-black">
                <Link to={slideContent[slide].linkDestination}>
                  {slideContent[slide].linkText}
                </Link>
              </div>
            </div>
            <div className="previewSlides">
              <img id="previewImage" src="" width="" height="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
