import React from "react";
import Sketch from "react-p5";
import { FlowSetNoise } from "../classes";
let f;
export const FlowNoiseGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5.colorMode(p5.RGB, 255);
    p5canvases = p5.selectAll(".react-p5");
    if (props.params != null) {
      p5.createCanvas(p5canvases[0].size().width, p5.windowHeight);
    } else {
      p5.createCanvas(
        p5canvases[0].size().width,
        p5.min(p5canvases[0].size().width, p5.windowHeight)
      ).parent(canvasParentRef);
    }
    let settings = { sketch: p5 };
    if (props.params) {
      for (let entry of props.params.entries()) {
        const [param, value] = entry;
        settings[param] = isNaN(parseFloat(value))
          ? value === true
          : parseFloat(value);
      }
    }
    f = new FlowSetNoise(settings);
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
export default FlowNoiseGen;
