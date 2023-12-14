import "./App.scss";
import "./Themes.css";
import { Footer } from "./components/visibles/Footer";
import { Timer } from "./components/visibles/Timer";
import { useState } from "react";

function App() {
  const [background, setBackground] = useState("forest");
  const backgroundChangeHandlers = {
    setForest: () => {
      setBackground("forest");
      document.body.classList.replace("space", "forest");
    },
    setSpace: () => {
      setBackground("space");
      document.body.classList.replace("forest", "space");
    },
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
