import "./App.scss";
import { Footer } from "./components/visibles/Footer";
import { Timer } from "./components/visibles/Timer";
import { useState } from "react";

function App() {
  const [background, setBackground] = useState("forest");
  const backgroundChangeHandlers = {
    setForest: () => setBackground("forest"),
    setSpace: () => setBackground("space"),
  };
  return (
    <>
      <div className={background} id="background-container" />
      <div id="app-container">
        <Timer />
      </div>
      <Footer handlers={backgroundChangeHandlers} bg={background} />
    </>
  );
}

export default App;
