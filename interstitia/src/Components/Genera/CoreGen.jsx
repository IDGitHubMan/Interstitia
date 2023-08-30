import React from "react";
import Sketch from "react-p5";
import { Core } from "../classes";
let f;
export const CoreGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    let settings = { sketch: p5 };
    if (props.params) {
      for (let entry of props.params.entries()) {
        const [param, value] = entry;
        settings[param] = isNaN(parseFloat(value))
          ? value === true
          : parseFloat(value);
      }
    }
    if (props.params != null) {
      p5.createCanvas(p5canvases[0].size().width, p5.windowHeight, p5.WEBGL);
    } else {
      p5.createCanvas(
        p5canvases[0].size().width,
        p5.min(p5canvases[0].size().width, p5.windowHeight),
        p5.WEBGL
      ).parent(canvasParentRef);
    }
    f = new Core(settings);
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
export default CoreGen;
