import { useState } from 'react';

export default function App() {
  // State variables for break length, session length, time left, and session number
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [sessionNum, setSessionNum] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleValue = (e) => {
    // Get the event and action from the button's id
    let id = e.target.id;
    let event = id.split("-")[0];
    let action = id.split("-")[1];

    // Get the current length and setter function based on the event
    const length = event === "break" ? breakLength : sessionLength;
    const setLength = event === "break" ? setBreakLength : setSessionLength;

    // Update the length based on the action
    if (length > 0 && length < 60) {
      if (action === "decrement") {
        setLength(prev => prev - 1);
      } else if (action === "increment") {
        setLength(prev => prev + 1);
      }
    }
  };

  const handleReset = () => {
    // Reset the break length, session length, and time left
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft("25:00");
  };

  const handleStartStop = () => {
    // Increment the session number
    setSessionNum(prev => prev + 1);

    if (intervalId === null) {
      // Start the timer
      const id = setInterval(() => {
        // Get the current minutes and seconds from the time left
        let time = timeLeft.split(":");
        let minutes = parseInt(time[0]);
        let seconds = parseInt(time[1]);

        // Update the minutes and seconds
        if (seconds === 0) {
          seconds = 59;
          minutes = minutes - 1;
        } else {
          seconds = seconds - 1;
        }

        // Update the time left
        setTimeLeft(`${minutes}:${seconds}`);
      }, 1000);

      // Set the interval ID
      setIntervalId(id);
    } else {
      // Stop the timer
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  // Render the component
  return (
    <>
      <div id="forest"></div>
      <div id="app-container">
        <div id="app">
          {/* Break length control */}
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

          {/* Session length control */}
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

          {/* Timer */}
          <div id="timer">
            <p id="timer-label">Session {sessionNum}</p>
            <p id="time-left">{timeLeft}</p>
            <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
            <button id="reset" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
