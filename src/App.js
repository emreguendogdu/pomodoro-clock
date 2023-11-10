import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";

export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionNum, setSessionNum] = useState(0);
  const [isSession, setIsSession] = useState(true);
  const intervalIdRef = useRef(null);

  const handleValue = (e) => {
    let id = e.target.id;
    let event = id.split("-")[0];
    let action = id.split("-")[1];

    if (action === undefined || event === undefined) return;

    const length = event === "break" ? breakLength : sessionLength;
    const setLength = event === "break" ? setBreakLength : setSessionLength;

    if (action === "increment") {
      if (length !== 60) {
        setLength((prev) => prev + 1);
      }
    } else if (action === "decrement") {
      if (length !== 1) {
        setLength((prev) => prev - 1);
      }
    }
  };

  const handleReset = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
    setBreakLength(5);
    setSessionLength(25);
    setSessionNum(1);
    setIsSession(true);

    // Reset the time left display
    document.getElementById("time-left").innerText = `${sessionLength}:00`;
  };

  const playSound = () => {
    const audio = new Audio();
    audio.src =
      "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    audio.autoplay = false;
    audio.muted = true;
    audio.play();
  };

  const handleStartStop = () => {
    if (intervalIdRef.current === null) {
      let length = isSession ? sessionLength : breakLength;

      const id = setInterval(() => {
        if (length === 0) {
          playSound();
          setIsSession((prev) => !prev);
          setSessionNum((prev) =>
            isSession ? prev + 1 : prev
          );

          length = isSession ? breakLength : sessionLength;
        } else {
          length -= 1;
        }

        // Update the time left display
        document.getElementById("time-left").innerText = `${String(
          Math.floor(length / 60)
        ).padStart(2, "0")}:${String(length % 60).padStart(2, "0")}`;
      }, 1000);

      intervalIdRef.current = id;
    } else {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <>
      <div id="forest" />
      <div id="app-container">
        <div id="app">
            <LengthControl event="break" length={breakLength} handleValue={handleValue} />
            <LengthControl event="session" length={sessionLength} handleValue={handleValue} />
          <div id="timer">
            <p id="timer-label">
              {isSession
                ? sessionNum > 0
                  ? "Session " + sessionNum
                  : "Session"
                : "Break"}
              <span className="break-span">
                {isSession
                  ? ""
                  : `(Next session: ${sessionNum})`}
              </span>
            </p>
            <p id="time-left">{`${sessionLength}:00`}</p>
            <audio id="beep">
              <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </audio>
            <button id="start_stop" onClick={handleStartStop}>
              Start/Stop
            </button>
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <footer>
        <a
          href="https://github.com/emreguendogdu"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
      </footer>
    </>
  );
}
