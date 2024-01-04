import "./App.scss"
import "./Themes.css"
import { Footer } from "./components/visibles/Footer/Footer"
import { Timer } from "./components/visibles/Timer/Timer"

function App() {
  return (
    <>
      <div id="background-container" />
      <div id="app-container">
        <div id="app">
          <Timer />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
