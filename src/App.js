import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";
import { Timer } from "./Timer";
import { Footer } from "./Footer";

const ms = 1000;
const initBreakLength = 0;
const initSessionLength = 0;

function App() {
  const [breakLength, setBreakLength] = useState(initBreakLength);
  const [sessionLength, setSessionLength] = useState(initSessionLength);
  const [labelDisplay, setLabelDisplay] = useState("Session 1");
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
    handleAudio("stop");
    setBreakLength(5);
    setSessionLength(25);
    updateDisplay(25 * 60);
    num = 1;
    setLabelDisplay(`Session 1`);
    handleTimerLabel("session");
  };

  const handleTimerLabel = (value) => {
    const timerLabel = document.getElementById("timer-label");
    const labelContainer = document.getElementById('label-container');
    switch (value) {
      case "break":
        setLabelDisplay("Break");
        timerLabel.classList.remove("border-bottom");
        if (!document.querySelector(".break-span")) {
          const span = document.createElement("span");
          span.classList.add("break-span");
          span.innerText = `Next session: ${num}`;
          labelContainer.appendChild(span);
        }
        return;
      case "session":
        if (document.querySelector(".break-span")) {
        labelContainer.removeChild(document.querySelector(".break-span"));
        }
        timerLabel.classList.add("border-bottom");
        return;
      default:
        return;
      }
    }

  const handleAudio = (value) => {
    const audio = document.getElementById("beep");
    switch (value) {
      case "play":
        audio.play();
        audio.playbackRate = 1.5;
        setTimeout(() => (audio.loop = false), 1000);
        return;
      case "stop":
        audio.pause();
        audio.currentTime = 0;
        return;
      default:
        return;
    }
  }

  const stopInterval = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };
  
let timerDuration = 60 * sessionLength;
let timerStatus = "";
let num = 1;

  const handleStartStop = () => {
    // IntervalIDRef.current = stopped;
    if (intervalIdRef.current === null) {
      handleAudio("stop");

      const id = setInterval(() => {
        if (timerDuration === 0) {
            handleAudio("play");
          if (timerStatus !== "break") { 
            num += 1;
            timerDuration = breakLength * 60;
            timerStatus = "break";
            handleTimerLabel("break");
          } else {
            timerDuration = sessionLength * 60;
            handleTimerLabel("session");
            setLabelDisplay(`Session ${num}`);
            timerStatus = "session";
          }
        } else { // if timer isn't 0
          timerDuration -= 1;
        }
        updateDisplay(timerDuration);
      }, ms);
      // set timer to running 
      intervalIdRef.current = id;
    } else  {  // Button click if timer running
      stopInterval();
    }
  };

  useEffect(() => {
    const minutes = sessionLength;
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
            labelDisplay={labelDisplay}
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