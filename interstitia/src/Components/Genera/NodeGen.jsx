import React from "react";
import Sketch from "react-p5";
import { Graph } from "../classes";
let f;
export const NodeGen = (props) => {
  let p5canvases;
  const setup = (p5, canvasParentRef) => {
    p5canvases = p5.selectAll(".react-p5");
    p5.colorMode(p5.HSL, 360);
    p5.createCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight)
    ).parent(canvasParentRef);
    if (props.params == null) {
      f = new Graph(p5, 15);
    } else {
      f = new Graph(
        p5,
        parseInt(props.params.get("nc")),
        parseInt(props.params.get("ns")),
        props.params.get("crv") === "true",
        props.params.get("cnv") === "true",
        props.params.get("rv") === "true",
        parseInt(props.params.get("cm")),
        parseInt(props.params.get("ci")),
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
        parseInt(props.params.get("rm")),
        parseInt(props.params.get("ri")),
        parseInt(props.params.get("rmin")),
        parseInt(props.params.get("rmax")),
        props.params.get("s") === "true",
        parseInt(props.params.get("swm")),
        parseInt(props.params.get("swi")),
        parseInt(props.params.get("swmin")),
        parseInt(props.params.get("swmax")),
        parseInt(props.params.get("sdm")),
        parseInt(props.params.get("sdi")),
        parseInt(props.params.get("sdmin")),
        parseInt(props.params.get("sdmax")),
        parseInt(props.params.get("scs")),
        parseInt(props.params.get("sci")),
        [
          parseInt(props.params.get("sc1A")),
          parseInt(props.params.get("sc1B")),
          parseInt(props.params.get("sc1C")),
        ],
        [
          parseInt(props.params.get("sc2A")),
          parseInt(props.params.get("sc2B")),
          parseInt(props.params.get("sc2C")),
        ],
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

export default NodeGen;
