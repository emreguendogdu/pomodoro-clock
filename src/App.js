import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";
import { Timer } from "./Timer";
import { Footer } from "./Footer";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
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
    const [event, action] = e.target.id.split("-");
    
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
    sessionNum = 1;
    setLabelDisplay(`Session 1`);
    handleTimerLabel("session");
  };

  const handleTimerLabel = (value) => {
    const timerLabel = document.getElementById("timer-label");
    const timerLabelP = document.querySelector("#timer-label p");
    switch (value) {
      case "break":
        setLabelDisplay("Break");
        timerLabelP.classList.remove("border-bottom");
        if (!document.querySelector(".break-span")) {
          const span = document.createElement("span");
          span.classList.add("break-span");
          span.innerText = `Next session: ${sessionNum}`;
          timerLabel.appendChild(span);
        }
        return;
      case "session":
        if (document.querySelector(".break-span")) {
        timerLabel.removeChild(document.querySelector(".break-span"));
        }
        timerLabelP.classList.add("border-bottom");
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
  let sessionNum = 1;

  const handleStartStop = () => {
    // IntervalIDRef.current = stopped;
    if (intervalIdRef.current === null) {
      handleAudio("stop");

      const id = setInterval(() => {
        if (timerDuration === 0) {
            handleAudio("play");
          if (timerStatus !== "break") { 
            handleTimerLabel("break");
            timerDuration = breakLength * 60;
            sessionNum += 1;
            timerStatus = "break";
          } else {
            setLabelDisplay(`Session ${sessionNum}`);
            handleTimerLabel("session");
            timerDuration = sessionLength * 60;
            timerStatus = "session";
          }
        } else { // if timer isn't 0
          timerDuration -= 1;
        }
        updateDisplay(timerDuration);
      }, 1000);
      // set timer to running 
      intervalIdRef.current = id;
    } else  {  // Button click if timer running
      stopInterval();
    }
  };

  useEffect(() => {
    updateDisplay(sessionLength * 60);
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