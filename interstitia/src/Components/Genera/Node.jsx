import { useState } from "react";

export const Node = () => {
  const [nodePrefs, setNodePrefs] = useState({
    nodeCount: 30,
    speed: 5,
    coreVisibility: true,
    connectionVisibility: true,
    rangeVisibility: false,
    colorMode: 0,
    colorInterval: 5,
    col1H: 0,
    col2H: 100,
    col1S: 0,
    col2S: 255,
    col1B: 0,
    col2B: 255,
    rangeMode: 0,
    rangeInterval: 5,
    rangeMin: 30,
    rangeMax: 100,
    sparkles: true,
    sparkleWeightMode: 0,
    sparkleWeightInterval: 5,
    sparkleWeightMin: 1,
    sparkleWeightMax: 10,
    sparkleDisplacementMode: 0,
    sparkleDisplacementInterval: 5,
    sparkleDisplacementMin: 0,
    sparkleDisplacementMax: 50,
    sparkleColSystem: 0,
    bgH: 0,
    bgS: 0,
    bgB: 0,
    bgA: 50,
  });
  return <form></form>;
};
export default Node;
