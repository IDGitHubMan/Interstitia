import { Link } from "react-router-dom";
export const HomeSlides = (props) => {
  props.slides.forEach((slide, index) => {
    slide["mClasses"] =
      index === props.slideNum
        ? "bodySection flex justify-center align-middle items-center active"
        : "bodySection flex justify-center align-middle items-center";
    slide["sClasses"] =
      index === props.slideNum
        ? "bodyText flex text-center align-middle justify-center rounded-md h-full flex-col items-center active"
        : "bodyText flex text-center align-middle justify-center rounded-md h-full flex-col items-center";
  });
  return (
    <div className="flex">
      {props.slides.map((slide) => (
        <div className={slide.mClasses}>
          <div className={slide.sClasses}>
            <p className="text-3xl">{slide.text}</p>
            <div className="buttonLink p-3 rounded-md text-black">
              <Link to={slide.linkDestination}>{slide.linkText}</Link>
            </div>
          </div>
          <div className="previewSlides">
            <img id="previewImage" src="" width="" height="" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSlides;
