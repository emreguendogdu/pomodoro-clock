import "./App.scss"
import "./Themes.css"
import { Footer } from "./components/visibles/Footer"
import Tasks from "./components/visibles/Tasks/Tasks"
import { Timer } from "./components/visibles/Timer"

function App() {
  return (
    <>
      <div id="background-container" />
      <div id="app-container">
        <div id="app">
          <Timer />
          <Tasks />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
