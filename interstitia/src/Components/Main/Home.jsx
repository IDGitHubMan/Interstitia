import Nav from "./Nav";
import Preview from "./HomeAnim";
import HomeSlides from "./HomeSlides";
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
      setSlide(slide + 1);
    }, 10000);
  }, [slide]);
  if (slide >= slideContent.length) {
    setSlide(0);
  }
  return (
    <div>
      <div className="absolute top-0 left-0 w-full">
        <Preview />
      </div>
      <div className="absolute top-0 left-0 w-full">
        <Nav />
        <HomeSlides slideNum={slide} slides={slideContent} />
      </div>
    </div>
  );
};
