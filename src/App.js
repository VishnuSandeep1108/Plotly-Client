import React, { useState } from "react";

import Home from "./components/home";
import Graph from "./components/graph";
import "./App.css";

function App() {
  const [fileName, setFileName] = useState("");
  const [iteration, updateIteration] = useState(0);
  const [isUploaded, setUploaded] = useState(false); // 0: not uploaded yet;

  return (
    <div className="App">
      {isUploaded === false ? <Home setFileName={setFileName} setUploaded={setUploaded}/>:<Graph fileName={fileName} iteration={iteration} updateIteration={updateIteration}/>}
    </div>
  )
}

export default App;