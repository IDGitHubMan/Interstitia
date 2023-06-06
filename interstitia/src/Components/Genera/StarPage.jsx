import { useSearchParams } from "react-router-dom";
import StarGen from "./StarGen";
import Nav from "../Main/Nav";

export const StarPage = () => {
  const [genParams, setGenParams] = useSearchParams();
  return genParams.size !== 0 ? (
    <div>
      <StarGen params={genParams} />
    </div>
  ) : (
    <div>
      <Nav />
      <StarGen />
      <div></div>
    </div>
  );
};
export default StarPage;
