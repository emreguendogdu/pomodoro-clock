import "./App.scss"
import { useState, useRef } from 'react';
// TODO: Fix playSound ( - Stop when reset clicked - Fix all errors)
// TODO: Re-design the website, Session/timeLeft should be a priority to eye

export default function App() {
  // State variables for break length, session length, time left, and session number
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(`${sessionLength}:00`);
  const [sessionNum, setSessionNum] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const intervalIdRef = useRef(null);

  const handleValue = (e) => {
    // Get the event and action from the button's id
    let id = e.target.id;
    let event = id.split("-")[0];
    let action = id.split("-")[1];

    // Quit if error occurs
    if (action === undefined || event === undefined) return;

    // Get the current length and setter function based on the event
    const length = event === "break" ? breakLength : sessionLength;
    const setLength = event === "break" ? setBreakLength : setSessionLength;

    // Update the length based on the action 
    if (action === "increment") {
      if (length !== 60) {
        setLength(prev => prev + 1);
       if (isSession && event === "session") {
          setTimeLeft(`${sessionLength + 1}:00`);
        } else if (!isSession && event === "break"){
          setTimeLeft(`${breakLength + 1}:00`);
        } 
      }
    } else if (action === "decrement") {
        setLength(prev => prev - 1);
        if (isSession && event === "session") {
          setTimeLeft(`${sessionLength - 1}:00`);
        } else if (!isSession && event === "break") {
          setTimeLeft(`${breakLength - 1}:00`);
        } 
      }
    }

  const handleReset = () => {
    // Stop the timer
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    // Reset the break length, session length, time left, and session number
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(`${25}:00`);
    setSessionNum(1);
    setIsSession(true);
  };
  const playSound = () => { 
    const audio = new Audio();
    // audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
    audio.src = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    audio.autoplay = false;
    audio.muted = true;
    audio.play();
  }
  const handleStartStop = () => {
    if (intervalIdRef.current === null) {
      // Start the timer
      let time = timeLeft.split(":");
      let minutes = parseInt(time[0]);
      let seconds = parseInt(time[1]);
      const id = setInterval(() => {
        // Update the minutes and seconds
        if (seconds === 0) {
          if (minutes === 0) {
            // End of session/break, switch to the other one
            playSound();
            setIsSession(prev => !prev);
            setSessionNum(prev => isSession ? prev + 1 : prev);
            setTimeLeft(isSession ? `${String(breakLength).padStart(2, '0')}:00` :`${String(sessionLength).padStart(2, '0')}:00`);
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            return;
          } else {
            seconds = 59;
            minutes = minutes - 1;
          }
        } else {
          seconds -= 1;
        }

        // Update the time left
        setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }, 1000);
      
      // Set the interval ID
      intervalIdRef.current = id;
    } else {
      // Stop the timer
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
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
          {/* Timer */}
          <div id="timer">
            <p id="timer-label">
              {isSession ? sessionNum > 0 ? 'Session ' + sessionNum : 'Session' : 'Break'}
              <span className="break-span">{isSession ? "" : `(Next session: ${sessionNum})`}</span>
            </p>
            <p id="time-left">{timeLeft}</p>
            <audio id="beep">
              <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </audio>
            <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
            <button id="reset" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
          </div>

      <footer>
        <a href="https://github.com/emreguendogdu" target="_blank" rel="noreferrer noopener">GitHub</a>
      </footer>
    </>
  );
}
