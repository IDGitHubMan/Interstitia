import Nav from "../Main/Nav";
import { Link } from "react-router-dom";
import FlowGen from "./FlowGen";
import NodeGen from "./NodeGen";
import { CoreGen } from "./CoreGen";
import StarGen from "./StarGen";

export const Genera = () => {
  const gens = [
    {
      genName: "Nodes",
      genDescription: "A gen that create a field of interconnected points.",
      display: <NodeGen />,
    },
    {
      genName: "Flow",
      genDescription: "A gen that constructs a flow field.",
      display: <FlowGen />,
    },
    {
      genName: "Core",
      genDescription: "A gen that produces pulses of rotating geometry.",
      display: <CoreGen />,
    },
    {
      genName: "Stars",
      genDescription: "A gen that produces a field of stars.",
      display: <StarGen />,
    },
  ];
  return (
    <div className="w-full">
      <Nav />
      <h2 className="text-7xl">Welcome to Genera!</h2>
      <p>
        Genera is a collection of sketches/toys called gens. Each gen takes
        several inputs, then adds some randomness and chaos to produce vibrant,
        dynamic graphics.
      </p>
      <div className="flex text-center flex-wrap w-full items-center">
        {gens.map((gen) => {
          return (
            <Link to={`/${gen.genName.toLowerCase()}`}>
              <div>
                <div>{gen.display}</div>
                <h3>{gen.genName}</h3>
                <p>{gen.genDescription}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Genera;
