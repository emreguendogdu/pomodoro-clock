import React, { useState, useRef, useEffect } from "react";
import { LengthControl } from "./LengthControl";
import { TimerDisplay } from "./TimerDisplay";
import { handleAudio } from "../AudioPlayer";
import { TimerPreset } from "./TimerPreset";

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

  const sessionIncrement = () => {
    setSessionLength(prev => prev < 60 ? prev + 1 : prev)
  }
  const sessionDecrement = () => {
    setSessionLength(prev => prev > 1 ? prev - 1 : prev)
  }

  const breakIncrement = () => {
    setBreakLength(prev => prev < 60 ? prev + 1 : prev)
  }
  const breakDecrement = () => {
    setBreakLength(prev => prev > 1 ? prev - 1 : prev)
  }

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
        const timerDisplay = document.getElementById("time-left");
        timerDisplay.classList.add("highlight");
        setTimeout(() => timerDisplay.classList.remove("highlight"), 1000);
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
            <LengthControl event="session" length={sessionLength} handleIncrement={sessionIncrement} handleDecrement={sessionDecrement} />
            <LengthControl event="break" length={breakLength} handleIncrement={breakIncrement} handleDecrement={breakDecrement} />
            </div>
            <div className="presets-container">
              <p>Presets <i class="fa fa-caret-down" aria-hidden="true" /></p>
              <TimerPreset s="50" b="10" setS={setSessionLength} setB={setBreakLength}/>
              <TimerPreset s="60" b="10" setS={setSessionLength} setB={setBreakLength}/>
              <TimerPreset s="25" b="5" setS={setSessionLength} setB={setBreakLength}/>
            </div>
        </div>
    </>
  );
}