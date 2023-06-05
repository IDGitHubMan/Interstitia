import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./Components/Main/Home";
import { useState } from "react";
import NotFound from "./Components/Main/NotFound";
import Genera from "./Components/Genera/Genera";
import NodePage from "./Components/Genera/NodePage";
import FlowPage from "./Components/Genera/FlowPage";
import CorePage from "./Components/Genera/CorePage";
import StarPage from "./Components/Genera/StarPage";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genera" element={<Genera />} />
        <Route path="/genera/nodes" element={<NodePage />} />
        <Route path="/genera/flow" element={<FlowPage />} />
        <Route path="/genera/core" element={<CorePage />} />
        <Route path="/genera/stars" element={<StarPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
