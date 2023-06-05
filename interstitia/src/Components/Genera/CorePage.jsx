import { useSearchParams } from "react-router-dom";
import { CoreGen } from "./CoreGen";
import Nav from "../Main/Nav";

export const CorePage = () => {
  const [genParams, setGenParams] = useSearchParams();
  return genParams.size !== 0 ? (
    <div>
      <CoreGen params={genParams} />
    </div>
  ) : (
    <div>
      <Nav />
      <CoreGen />
      <div></div>
    </div>
  );
};
export default CorePage;
