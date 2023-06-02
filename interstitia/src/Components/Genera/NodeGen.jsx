import React from "react";
import Sketch from "react-p5";
import { Graph } from "../classes";
let f;
export const NodeGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    p5.print(p5canvases[0].size());
    p5.colorMode(p5.HSL, 360);
    p5.createCanvas(
      p5canvases[0].size().width,
      p5canvases[0].size().width
    ).parent(canvasParentRef);
    f = new Graph(p5);
  };

  const draw = (p5) => {
    f.update();
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5canvases[0].size().width, p5canvases[0].size().width);
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default NodeGen;
