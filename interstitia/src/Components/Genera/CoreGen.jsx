import React from "react";
import Sketch from "react-p5";
import { Core } from "../classes";
let f;
export const CoreGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    p5.createCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight),
      p5.WEBGL
    ).parent(canvasParentRef);
    if (props.params == null) {
      f = new Core(p5);
    } else {
      f = new Core(
        p5,
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
        parseInt(props.params.get("pt")),
        parseInt(props.params.get("pc")),
        props.params.get("rz") === "true",
        props.params.get("ry") === "true",
        props.params.get("rx") === "true",
        parseInt(props.params.get("v")),
        props.params.get("dp") === "true",
        props.params.get("ds") === "true",
        props.params.get("da") === "true",
        props.params.get("fa") === "true",
        parseFloat(props.params.get("init")),
        parseFloat(props.params.get("r")),
        [
          parseInt(props.params.get("bgA")),
          parseInt(props.params.get("bgB")),
          parseInt(props.params.get("bgC")),
        ],
        parseFloat(props.params.get("rs"))
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
