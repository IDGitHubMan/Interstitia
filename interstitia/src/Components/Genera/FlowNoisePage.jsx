import FlowNoiseGen from "./FlowNoiseGen";
import { useSearchParams } from "react-router-dom";
import Nav from "../Main/Nav";

export const FlowNoisePage = () => {
  const [genParams, setGenParams] = useSearchParams();
  return genParams.size !== 0 ? (
    <div>
      <FlowNoiseGen params={genParams} />
    </div>
  ) : (
    <div>
      <Nav />
      <FlowNoiseGen />
      <div></div>
    </div>
  );
};
export default FlowNoisePage;
