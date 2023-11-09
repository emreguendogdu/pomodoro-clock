import './App.scss';
import { useState } from 'react';

export default function App() {
  const [breakLength, setBreakLength] = useState("5");
  const [sessionLength, setSessionLength] = useState("25");

  const handleValue = (e) => {
    let id = e.target.id;
    let event = id.split("-")[0];
    let action = id.split("-")[1];

    const setLength = event === "break" ? setBreakLength : setSessionLength;
      if (action === "decrement") {
        setLength(prev => Number(prev) - 1);
      } else if (action === "increment") {
        setLength(prev => Number(prev) + 1);
      };
  };

  const handleReset = () => {
    setBreakLength("5");
    setSessionLength("25");
  };

  return (
    <>
    <div id="forest"></div>
    <div id="app-container">
      <div id="app">
        <div className="length-control">
          <p id="break-label">Break Length</p>
          <button id="break-increment" onClick={handleValue}>
            <i className="fa fa-arrow-up"></i>
          </button>
          <p id="break-length">{breakLength}</p>
          <button id="break-decrement" onClick={handleValue}>
            <i className="fa fa-arrow-down"></i>
          </button>
        </div>
        <div className="length-control">
          <p id="session-label">Session Length</p>
            <button id="session-increment" onClick={handleValue}>
            <i className="fa fa-arrow-up"></i>
            </button>
          <p id="session-length">{sessionLength}</p>
            <button id="session-decrement" onClick={handleValue}>
            <i className="fa fa-arrow-down"></i>
            </button>
        </div>
        <div id="timer">
          <p id="timer-label">Session x</p>
          <p id="time-left">00:00</p>
          <button id="start_stop">Start/Stop</button>
          <button id="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
    </>
  );
}
