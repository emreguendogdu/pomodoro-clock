import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";
import { Timer } from "./Timer";
import { Footer } from "./Footer";

const ms = 1;
const initialSessionLength = 1;

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(initialSessionLength);
  const [sessionNum, setSessionNum] = useState(1);
  const [isSession, setIsSession] = useState(true);
  const [display, setDisplay] = useState(`Session ${sessionNum}`);
  const intervalIdRef = useRef(null);

  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const updateDisplay = (length) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    document.getElementById("time-left").innerText = formatTime(minutes, seconds);
  };

  const handleValue = (e) => {
    const event = e.target.id.split("-")[0];
    const action = e.target.id.split("-")[1];

    if (action === undefined || event === undefined) return;

    const setLength = event === "break" ? setBreakLength : setSessionLength;

    if (action === "increment") {
      setLength((prev) => (prev < 60 ? prev + 1 : prev));
    } else if (action === "decrement") {
      setLength((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const handleReset = () => {
    stopInterval();
    stopSound();
    setBreakLength(5);
    setSessionLength(25);
    setSessionNum(1);
    setIsSession(true);
    setDisplay(`Session 1`);
    document.getElementById("timer-label").classList.add("border-bottom");
    updateDisplay(25 * 60);
  };

  const playSound = () => {
    const audio = document.getElementById("beep");
    audio.playbackRate = 1.5;

    setTimeout(() => (audio.loop = false), isSession ? 3000 : 1000);

    audio.play();
  };

  const stopSound = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };

  const stopInterval = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };

  const handleStartStop = () => {
    const timerLabel = document.getElementById("timer-label");

    if (intervalIdRef.current === null) {
      let length = 60 * (isSession ? sessionLength : breakLength);
      stopSound();

      const id = setInterval(() => {
        if (length === 0) {
          playSound();
          setIsSession((prev) => !prev);
          console.log(isSession);
          setSessionNum((prev) => (isSession ? prev + 1 : prev));
          length = 60 * (isSession ? breakLength : sessionLength);
          if (isSession) {
            timerLabel.classList.remove("border-bottom");
            setDisplay("Break");
          } else {
            setDisplay(`Session ${sessionNum}`);
            timerLabel.classList.add("border-bottom");
            stopInterval();
          }
        } else {
          length -= 1;
        }
        updateDisplay(length);
      }, ms);
      console.log("testi");
      intervalIdRef.current = id;
    } else {
      stopInterval();
    }
  };

  useEffect(() => {
    const minutes = isSession ? sessionLength : breakLength;
    const seconds = 0;
    updateDisplay(minutes * 60 + seconds);
  });

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
          <Timer
            isSession={isSession}
            display={display}
            sessionNum={sessionNum}
            sessionLength={sessionLength}
            handleStartStop={handleStartStop}
            handleReset={handleReset}
          />
          <div className="length-container">
            <LengthControl event="break" length={breakLength} handleValue={handleValue} />
            <LengthControl event="session" length={sessionLength} handleValue={handleValue} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
