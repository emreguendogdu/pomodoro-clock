import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";
import { Timer } from "./Timer";
import { Footer } from "./Footer";
const ms = 1;
const seslength = 1;
export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(seslength);
  const [sessionNum, setSessionNum] = useState(1);
  const [isSession, setIsSession] = useState(true);
  const [display, setDisplay] = useState("Session " + sessionNum);
  // The purpose of intervalIdRef is to have access to the interval ID from within different parts of the component, especially for clearing the interval using clearInterval when needed.
  const intervalIdRef = useRef(null);

  const handleValue = (e) => {
    let event = e.target.id.split("-")[0];
    let action = e.target.id.split("-")[1];
    if (action === undefined || event === undefined) return;
    const setLength = event === "break" ? setBreakLength : setSessionLength;
    if (action === "increment") {
        setLength((prev) => (prev < 60 ? prev+1: prev));
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
    setDisplay("Session 1");
    document.getElementById("timer-label").classList.add("border-bottom");
    // Reset the time left display
    document.getElementById("time-left").innerText = `${sessionLength}:00`;
  };
  
  const playSound = () => {
    const audio = document.getElementById("beep");
    audio.playbackRate = 1.5; 
    if (isSession) {
      setTimeout(() => audio.loop = false, 3000);
    } else {
      setTimeout(() => audio.loop = false, 1000);
    }
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
  }

  const handleStartStop = () => {
    const timerLabel = document.getElementById("timer-label");
    // If no active interval (or: timer) create one
    if (intervalIdRef.current === null) {
      let length = 60 * (isSession ? sessionLength : breakLength);
      stopSound();
      const id = setInterval(() => {
        if (length === 0) {
          playSound();
          if (isSession) {
            timerLabel.classList.remove("border-bottom");
            setDisplay("Break");
          } else {
            setDisplay("Session " + sessionNum);
            timerLabel.classList.add("border-bottom");
          }
          setIsSession((prev) => !prev);
          setSessionNum((prev) => isSession ? prev + 1 : prev);
          // If time ends, and was Session, change to breakLength
          length = 60 * (isSession ? breakLength : sessionLength);
          stopInterval();
        } else {
          length -= 1;
        }

        // Update the time left display
        document.getElementById("time-left").innerText = `${String(Math.floor(length / 60)
        ).padStart(2, "0")}:${String(length % 60).padStart(2, "0")}`;

      }, ms);

      intervalIdRef.current = id;
      console.log(length);
    }
    // If there were active interval, stop interval for now
      else {
      stopInterval();
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
            <Timer isSession={isSession} display={display} sessionNum={sessionNum} sessionLength={sessionLength} handleStartStop={handleStartStop} handleReset={handleReset}/>
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
