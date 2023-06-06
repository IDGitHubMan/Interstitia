import NodeGen from "./NodeGen";
import { useSearchParams } from "react-router-dom";
import Nav from "../Main/Nav";

export const NodePage = () => {
  const [genParams, setGenParams] = useSearchParams();
  return genParams.size !== 0 ? (
    <div>
      <NodeGen params={genParams} />
    </div>
  ) : (
    <div>
      <Nav />
      <NodeGen />
      <div></div>
    </div>
  );
};
export default NodePage;
