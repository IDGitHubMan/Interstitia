import React from "react";
import Sketch from "react-p5";
import { FlowSetNoise, Graph, NoiseWave } from "../classes";
let g;
let f;
let r;
let current = 0;
let time;
export const Preview = (props) => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    let settings = { sketch: p5 };
    g = new Graph(settings);
    f = new FlowSetNoise(p5);
    r = new NoiseWave(p5);
    time = p5.millis();
  };

  const draw = (p5) => {
    if (p5.millis() - time >= 10000) {
      time = p5.millis();
      current += 1;
      if (props.slideNum + 1 >= props.slides.length) {
        props.slideSet(0);
      } else {
        props.slideSet(props.slideNum + 1);
      }
    }
    if (current >= 3) {
      current = 0;
    }
    if (current === 0) {
      g.update();
    } else if (current === 1) {
      f.update();
    } else if (current === 2) {
      r.update();
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    r.resize();
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
export default Preview;
