import React from "react";
import Sketch from "react-p5";
import { Starfield } from "../classes";
export const StarGen = (props) => {
  let p5canvases;
  let f;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    p5.createCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight)
    ).parent(canvasParentRef);
    if (props.params == null) {
      f = new Starfield(p5);
    } else {
      f = new Starfield(
        p5,
        parseInt(props.params.get("pmin")),
        parseInt(props.params.get("pmax")),
        parseInt(props.params.get("rmin")),
        parseInt(props.params.get("rmax")),
        parseInt(props.params.get("ti")),
        parseFloat(props.params.get("tc")),
        parseFloat(props.params.get("t1")),
        parseFloat(props.params.get("t2")),
        parseFloat(props.params.get("t3")),
        parseFloat(props.params.get("t4")),
        parseFloat(props.params.get("t5")),
        [
          parseInt(props.params.get("c1A")),
          parseInt(props.params.get("c1B")),
          parseInt(props.params.get("c1C")),
        ],
        [
          parseInt(props.params.get("c2A")),
          parseInt(props.params.get("c2B")),
          parseInt(props.params.get("c2C")),
        ],
        [
          parseInt(props.params.get("c3A")),
          parseInt(props.params.get("c3B")),
          parseInt(props.params.get("c3C")),
        ],
        [
          parseInt(props.params.get("c4A")),
          parseInt(props.params.get("c4B")),
          parseInt(props.params.get("c4C")),
        ],
        [
          parseInt(props.params.get("c5A")),
          parseInt(props.params.get("c5B")),
          parseInt(props.params.get("c5C")),
        ],
        [
          parseInt(props.params.get("c6A")),
          parseInt(props.params.get("c6B")),
          parseInt(props.params.get("c6C")),
        ],
        [
          parseInt(props.params.get("c7A")),
          parseInt(props.params.get("c7B")),
          parseInt(props.params.get("c7C")),
        ],
        parseInt(props.params.get("sc")),
        parseInt(props.params.get("bgA"))
      );
    }
  };

  const draw = (p5) => {
    f.update();
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight)
    );
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
export default StarGen;
