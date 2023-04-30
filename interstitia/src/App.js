import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { useState } from "react";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
