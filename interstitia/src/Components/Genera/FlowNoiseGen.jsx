import React from "react";
import Sketch from "react-p5";
import { FlowSetNoise } from "../classes";
let f;
export const FlowNoiseGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    if (props.params != null) {
      p5.createCanvas(p5canvases[0].size().width, p5.windowHeight);
    } else {
      p5.createCanvas(
        p5canvases[0].size().width,
        p5.min(p5canvases[0].size().width, p5.windowHeight)
      ).parent(canvasParentRef);
    }
    if (props.params == null) {
      f = new FlowSetNoise(p5);
    } else {
      f = new FlowSetNoise(
        p5,
        parseInt(props.params.get("cs")),
        parseInt(props.params.get("res")),
        parseFloat(props.params.get("x")),
        parseFloat(props.params.get("y")),
        props.params.get("st") === "true",
        props.params.get("f") === "true",
        parseInt(props.params.get("r")),
        parseInt(props.params.get("sm")),
        parseFloat(props.params.get("smin")),
        parseFloat(props.params.get("smax")),
        parseInt(props.params.get("si")),
        parseFloat(props.params.get("fc")),
        parseFloat(props.params.get("lim")),
        [
          parseFloat(props.params.get("c0A")),
          parseFloat(props.params.get("c0B")),
          parseFloat(props.params.get("c0C")),
        ],
        [
          parseFloat(props.params.get("c1A")),
          parseFloat(props.params.get("c1B")),
          parseFloat(props.params.get("c1C")),
        ],
        [
          parseFloat(props.params.get("c2A")),
          parseFloat(props.params.get("c2B")),
          parseFloat(props.params.get("c2C")),
        ],
        [
          parseFloat(props.params.get("c3A")),
          parseFloat(props.params.get("c3B")),
          parseFloat(props.params.get("c3C")),
        ],
        parseFloat(props.params.get("bga")),
        parseFloat(props.params.get("rs")),
        parseFloat(props.params.get("ns"))
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
export default FlowNoiseGen;
