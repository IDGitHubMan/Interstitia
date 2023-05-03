import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { useState } from "react";
import NotFound from "./Components/NotFound";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
