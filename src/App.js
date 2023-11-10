import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import { LengthControl } from "./LengthControl";
import { Timer } from "./Timer";
import { Footer } from "./Footer";

// TODO: Padlock sadece timeleft'te değişim olunca geliyor, sürekli gelmeli ya da length değişince de gelmeli
export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(0);
  const [sessionNum, setSessionNum] = useState(0);
  const [isSession, setIsSession] = useState(true);
  // The purpose of intervalIdRef is to have access to the interval ID from within different parts of the component, especially for clearing the interval using clearInterval when needed.
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

  const stopInterval = () => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = null;
  }
  const handleReset = () => {
    stopInterval();
    setBreakLength(5);
    setSessionLength(25);
    setSessionNum(0);
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
    // If no active interval (or: timer) create one
    if (intervalIdRef.current === null) {
      let length = isSession ? sessionLength : breakLength;
      length *= 60;
      const id = setInterval(() => {
        if (length === 0) {
          playSound();
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

      }, 1000);

      intervalIdRef.current = id;
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
            <LengthControl event="break" length={breakLength} handleValue={handleValue} />
            <LengthControl event="session" length={sessionLength} handleValue={handleValue} />
            <Timer isSession={isSession} sessionNum={sessionNum} sessionLength={sessionLength} handleStartStop={handleStartStop} handleReset={handleReset}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
