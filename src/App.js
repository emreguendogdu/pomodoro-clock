import "./App.scss";
import "./Themes.css";
import { Footer } from "./components/visibles/Footer";
import { Timer } from "./components/visibles/Timer";

function App() {
  return (
    <>
      <div id="background-container" />
      <div id="app-container">
        <Timer />
      </div>
      <Footer />
    </>
  );
}

export default App;
