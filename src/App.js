import "./App.scss";
import { Footer } from "./components/visibles/Footer";
import { Timer } from "./Timer";

function App() {
  return (
    <>
      <div id="forest" />
      <div id="app-container">
        <Timer />
      </div>
      <Footer />
    </>
  );
}

export default App;