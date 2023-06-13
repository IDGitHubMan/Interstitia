import React, { useState } from "react";
import Sketch from "react-p5";
import { Starfield } from "../classes";
export const StarGen = (props) => {
  const [locals, setLocals] = useState({});
  const setup = (p5, canvasParentRef) => {
    let p5canvases = p5.selectAll(".react-p5");
    p5.createCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight)
    ).parent(canvasParentRef);
    if (props.params) {
      setLocals({
        ...locals,
        f: new Starfield(
          p5,
          parseInt(props.params.get("pmin")),
          parseInt(props.params.get("pmax")),
          parseInt(props.params.get("rmin")),
          parseInt(props.params.get("rmax")),
          parseInt(props.params.get("ti")),
          parseFloat(props.params.get("tc")),
          parseFloat(props.params.get("t1")),
          parseFloat(props.params.get("t2")),
          parseFloat(props.params.get("t3")),
          parseFloat(props.params.get("t4")),
          parseFloat(props.params.get("t5")),
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
          [
            parseInt(props.params.get("c3A")),
            parseInt(props.params.get("c3B")),
            parseInt(props.params.get("c3C")),
          ],
          [
            parseInt(props.params.get("c4A")),
            parseInt(props.params.get("c4B")),
            parseInt(props.params.get("c4C")),
          ],
          [
            parseInt(props.params.get("c5A")),
            parseInt(props.params.get("c5B")),
            parseInt(props.params.get("c5C")),
          ],
          [
            parseInt(props.params.get("c6A")),
            parseInt(props.params.get("c6B")),
            parseInt(props.params.get("c6C")),
          ],
          [
            parseInt(props.params.get("c7A")),
            parseInt(props.params.get("c7B")),
            parseInt(props.params.get("c7C")),
          ],
          parseInt(props.params.get("sc")),
          parseInt(props.params.get("bgA"))
        ),
      });
    } else if (props.settings) {
      setLocals({
        ...locals,
        f: new Starfield(
          p5,
          props.settings.pmin,
          props.settings.pmax,
          props.settings.rmin,
          props.settings.rmax,
          props.settings.ti,
          props.settings.tc,
          props.settings.t1,
          props.settings.t2,
          props.settings.t3,
          props.settings.t4,
          props.settings.t5,
          [props.settings.c1A, props.settings.c1B, props.settings.c1C],
          [props.settings.c2A, props.settings.c2B, props.settings.c2C],
          [props.settings.c3A, props.settings.c3B, props.settings.c3C],
          [props.settings.c4A, props.settings.c4B, props.settings.c4C],
          [props.settings.c5A, props.settings.c5B, props.settings.c5C],
          [props.settings.c6A, props.settings.c6B, props.settings.c6C],
          [props.settings.c7A, props.settings.c7B, props.settings.c7C],
          props.settings.sc * 1000,
          props.settings.bgA
        ),
        s: Object.values(props.settings),
      });
    } else {
      setLocals({ ...locals, f: new Starfield(p5) });
    }
  };

  const draw = (p5) => {
    if (locals.s) {
      locals.s.forEach((item) => {
        if (item != Object.values(props.settings)[locals.s.indexOf(item)]) {
          p5.print("The sketch needs to update.");
          setLocals({
            ...locals,
            f: new Starfield(
              p5,
              props.settings.pmin,
              props.settings.pmax,
              props.settings.rmin,
              props.settings.rmax,
              props.settings.ti,
              props.settings.tc,
              props.settings.t1,
              props.settings.t2,
              props.settings.t3,
              props.settings.t4,
              props.settings.t5,
              [props.settings.c1A, props.settings.c1B, props.settings.c1C],
              [props.settings.c2A, props.settings.c2B, props.settings.c2C],
              [props.settings.c3A, props.settings.c3B, props.settings.c3C],
              [props.settings.c4A, props.settings.c4B, props.settings.c4C],
              [props.settings.c5A, props.settings.c5B, props.settings.c5C],
              [props.settings.c6A, props.settings.c6B, props.settings.c6C],
              [props.settings.c7A, props.settings.c7B, props.settings.c7C],
              props.settings.sc * 1000,
              props.settings.bgA
            ),
            s: Object.values(props.settings),
          });
        }
      });
    }
    locals.f.update();
  };

  const windowResized = (p5) => {
    let p5canvases = p5.selectAll(".react-p5");
    p5.resizeCanvas(
      p5canvases[0].size().width,
      p5.min(p5canvases[0].size().width, p5.windowHeight)
    );
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};
export default StarGen;
