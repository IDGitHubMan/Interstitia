import React from "react";
import Sketch from "react-p5";
import { FlowSet } from "../classes";
let f;
export const FlowGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    p5.createCanvas(
      p5canvases[0].size().width,
      p5canvases[0].size().width
    ).parent(canvasParentRef);
    f = new FlowSet(p5);
  };

  const draw = (p5) => {
    f.update();
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5canvases[0].size().width, p5canvases[0].size().width);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default FlowGen;
