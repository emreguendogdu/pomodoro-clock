import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./components/visibles/LengthControl";
import { TimerDisplay } from "./components/visibles/TimerDisplay";
import { handleAudio } from "./components/AudioPlayer";

export function Timer() {
  // State hooks
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [labelDisplay, setLabelDisplay] = useState("Session 1");
  const intervalIdRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Update the display with the given length
  const updateDisplay = (length) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;
    document.getElementById("time-left").innerText = formatTime(minutes, seconds);
  };

  // Handle click events on increment/decrement buttons
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

  // Reset all settings to default
  const handleReset = () => {
    stopInterval();
    handleAudio("stop");
    setBreakLength(5);
    setSessionLength(25);
    updateDisplay(25 * 60);
    sessionNum = 1;
    setLabelDisplay("Session 1");
    handleTimerLabel("reset");
  };

  // Handle timer label display based on the given value
  const handleTimerLabel = (value) => {
    const timerLabel = document.getElementById("timer-label");
    const timerLabelP = document.querySelector("#timer-label p");

    if (value === "break") {
      // Display "Break" label
      setLabelDisplay("Break");
      timerLabelP.classList.remove("border-bottom");
      
      // Display the next session information
      if (!document.querySelector(".break-span")) {
        const span = document.createElement("span");
        span.classList.add("break-span");
        span.innerText = `Next session: ${sessionNum}`;
        timerLabel.appendChild(span);
      }
    } else if (value === "session") {
      // Remove the next session information when returning to a session
      if (document.querySelector(".break-span")) {
        timerLabel.removeChild(document.querySelector(".break-span"));
      }
      setLabelDisplay(`Session ${sessionNum}`);
      timerLabelP.classList.add("border-bottom");
    }
    else if (value === "reset") {
      // Remove the next session information when returning to a session
      if (document.querySelector(".break-span")) {
        timerLabel.removeChild(document.querySelector(".break-span"));
      }
      timerLabelP.classList.add("border-bottom");
    }
  };

  // Stop the running interval
  const stopInterval = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  };
  
  // Initializations
  let timerDuration = 60 * sessionLength;
  let sessionNum = 1;
  let timerStatus;
  // Handle start and stop of the timer
  const handleStartStop = () => {
    if (intervalIdRef.current === null) {
      handleAudio("stop");

      // Start the interval
      const id = setInterval(() => {
        if (timerDuration === 0) {
          // When timer reaches 0
          handleAudio("play");

          if (timerStatus !== "break") { 
            // Switch to break time
            handleTimerLabel("break");
            timerDuration = breakLength * 60;
            sessionNum += 1;
            timerStatus = "break";
          } else {
            // Switch back to session time
            handleTimerLabel("session");
            timerDuration = sessionLength * 60;
            timerStatus = "session";
          }
        } else {
          // Decrease the timer duration
          timerDuration -= 1;
        }
        updateDisplay(timerDuration);
      }, 1000);

      // Set timer to running
      intervalIdRef.current = id;
    } else  {  
      // Stop the running interval if the timer is already running
      stopInterval();
    }
  };

  // Update the display when the session length changes
  useEffect(() => {
    updateDisplay(sessionLength * 60);
  });

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);
    return (
    <>
        <div id="app">
            <TimerDisplay
            labelDisplay={labelDisplay}
            handleStartStop={handleStartStop}
            handleReset={handleReset}
            />
            <div className="length-container">
            <LengthControl event="break" length={breakLength} handleValue={handleValue} />
            <LengthControl event="session" length={sessionLength} handleValue={handleValue} />
            </div>
        </div>
    </>
  );
}