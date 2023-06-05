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
          parseInt(props.params.get("c1A")),
          parseInt(props.params.get("c1B")),
          parseInt(props.params.get("c1C")),
        ],
        [
          parseInt(props.params.get("c2A")),
          parseInt(props.params.get("c2B")),
          parseInt(props.params.get("c2C")),
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
        [
          parseInt(props.params.get("bgA")),
          parseInt(props.params.get("bgB")),
          parseInt(props.params.get("bgC")),
          parseInt(props.params.get("bgD")),
        ]
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
