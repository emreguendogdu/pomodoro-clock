import React, { useState, useRef, useEffect } from "react"
import { LengthControl } from "./LengthControl"
import { TimerDisplay } from "./TimerDisplay"
import { handleAudio } from "../AudioPlayer"
import TimerPresets from "./TimerPresets"

export function Timer() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [labelDisplay, setLabelDisplay] = useState("Session 1")
  const intervalIdRef = useRef(null)

  // Format time in MM:SS
  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(seconds).padStart(2, "0")
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const updateDisplay = (length) => {
    const minutes = Math.floor(length / 60)
    const seconds = length % 60
    document.getElementById("time-left").innerText = formatTime(
      minutes,
      seconds
    )
  }

  const sessionIncrement = () => {
    setSessionLength((prev) => (prev < 60 ? prev + 1 : prev))
  }
  const sessionDecrement = () => {
    setSessionLength((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const breakIncrement = () => {
    setBreakLength((prev) => (prev < 60 ? prev + 1 : prev))
  }
  const breakDecrement = () => {
    setBreakLength((prev) => (prev > 1 ? prev - 1 : prev))
  }

  // Reset all settings to default
  const resetTimer = () => {
    const defaultSessionLength = 25
    stopInterval()
    handleAudio("stop")
    setBreakLength(5)
    setSessionLength(defaultSessionLength)
    updateDisplay(defaultSessionLength * 60)
    timerDuration = defaultSessionLength * 60
    sessionNum = 1
    setLabelDisplay("Session 1")
    handleTimerLabel("reset")
  }

  // Handle timer label display based on the given value
  const handleTimerLabel = (value) => {
    const timerLabel = document.getElementById("timer-label")
    const timerLabelP = document.querySelector("#timer-label p")
    const breakSpan = document.querySelector(".break-span")

    if (value === "break") {
      // Display "Break" label
      setLabelDisplay("Break")
      timerLabelP.classList.remove("border-bottom")

      // Display the next session information
      if (!breakSpan) {
        const span = document.createElement("span")
        span.classList.add("break-span")
        span.innerText = `Next session: ${sessionNum + 1}`
        timerLabel.appendChild(span)
      }
    } else if (value === "session" || value === "reset") {
      if (breakSpan) {
        timerLabel.removeChild(breakSpan)
      }
      setLabelDisplay(`Session ${sessionNum}`)
      timerLabelP.classList.add("border-bottom")
    }
  }

  // Stop the running interval
  const stopInterval = () => {
    clearInterval(intervalIdRef.current)
    intervalIdRef.current = null
  }

  // Initializations
  let timerDuration = 60 * sessionLength
  let sessionNum = 1
  let timerStatus

  // Handle start and stop of the timer
  const handleStartStop = () => {
    if (intervalIdRef.current === null) {
      handleAudio("stop")

      // Start the interval
      const id = setInterval(() => {
        const timerDisplay = document.getElementById("time-left")
        timerDisplay.classList.add("highlight")
        setTimeout(() => timerDisplay.classList.remove("highlight"), 500)
        if (timerDuration === 0) {
          // When timer reaches 0
          handleAudio("play")

          if (timerStatus !== "break") {
            // Switch to break time
            handleTimerLabel("break")
            timerDuration = breakLength * 60
            sessionNum += 1
            timerStatus = "break"
          } else {
            // Switch back to session time
            handleTimerLabel("session")
            timerDuration = sessionLength * 60
            timerStatus = "session"
          }
        } else {
          // Decrease the timer duration
          timerDuration -= 1
        }
        updateDisplay(timerDuration)
      }, 1000)

      // Set timer to running
      intervalIdRef.current = id
    } else {
      // Stop the running interval if the timer is already running
      stopInterval()
    }
  }

  // Update the display when the session length changes
  useEffect(() => {
    updateDisplay(sessionLength * 60)
  })

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [])

  return (
    <>
      <TimerDisplay
        labelDisplay={labelDisplay}
        handleStartStop={handleStartStop}
        handleReset={resetTimer}
      />
      <div className="length-container">
        <LengthControl
          event="session"
          length={sessionLength}
          handleIncrement={sessionIncrement}
          handleDecrement={sessionDecrement}
        />
        <LengthControl
          event="break"
          length={breakLength}
          handleIncrement={breakIncrement}
          handleDecrement={breakDecrement}
        />
      </div>
      <TimerPresets setSession={setSessionLength} setBreak={setBreakLength} />
    </>
  )
}
