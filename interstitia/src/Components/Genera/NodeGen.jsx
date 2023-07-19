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
        parseFloat(props.params.get("ns")),
        props.params.get("crv") === "true",
        props.params.get("cnv") === "true",
        props.params.get("rv") === "true",
        parseInt(props.params.get("cm")),
        parseFloat(props.params.get("ci")),
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
        parseInt(props.params.get("rm")),
        parseFloat(props.params.get("ri")),
        parseFloat(props.params.get("rmin")),
        parseFloat(props.params.get("rmax")),
        props.params.get("s") === "true",
        parseInt(props.params.get("swm")),
        parseFloat(props.params.get("swi")),
        parseFloat(props.params.get("swmin")),
        parseFloat(props.params.get("swmax")),
        parseInt(props.params.get("sdm")),
        parseFloat(props.params.get("sdi")),
        parseFloat(props.params.get("sdmin")),
        parseFloat(props.params.get("sdmax")),
        parseInt(props.params.get("scs")),
        parseFloat(props.params.get("sci")),
        [
          parseFloat(props.params.get("sc1A")),
          parseFloat(props.params.get("sc1B")),
          parseFloat(props.params.get("sc1C")),
        ],
        [
          parseFloat(props.params.get("sc2A")),
          parseFloat(props.params.get("sc2B")),
          parseFloat(props.params.get("sc2C")),
        ],
        [
          parseFloat(props.params.get("bgA")),
          parseFloat(props.params.get("bgB")),
          parseFloat(props.params.get("bgC")),
          parseFloat(props.params.get("bgD")),
        ],
        parseFloat(props.params.get("rs"))
      );
    }
  };

  const draw = (p5) => {
    f.update();
  };

  const windowResized = (p5) => {
    if (props.params != null) {
      p5.resizeCanvas(p5canvases[0].size().width, p5.windowHeight);
    } else {
      p5.resizeCanvas(
        p5canvases[0].size().width,
        p5.min(p5canvases[0].size().width, p5.windowHeight)
      );
    }
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default NodeGen;
