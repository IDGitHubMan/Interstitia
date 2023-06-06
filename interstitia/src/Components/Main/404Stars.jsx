import React from "react";
import Sketch from "react-p5";
import { Starfield } from "../classes";
let points = [];
export const Stars = (props) => {
  let text;
  let navbar;
  let f;
  const setup = (p5, canvasParentRef) => {
    text = p5.select(".text404");
    navbar = p5.select("nav");
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    f = new Starfield(p5);
  };

  const draw = (p5) => {
    p5.background(0);
    f.update();
    text.position(
      p5.width / 2 +
        p5.cos(p5.millis() / 1000) * p5.atan(p5.millis() / 1000) * 15 -
        text.size().width / 2,
      p5.height / 2 +
        p5.sin(p5.millis() / 1000) * p5.atan(p5.millis() / 1000) * 15 -
        text.size().height / 2
    );
    let styleString = p5.join(
      ["rotate(", p5.sin(p5.millis() / 1000) * 4, "deg)"],
      ""
    );
    navbar.style("transform", styleString);
    navbar.position(navbar.position().x, 80);
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      className="fixed top-0 left-0"
    />
  );
};
export default Stars;
