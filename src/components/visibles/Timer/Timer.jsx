import { useState, useRef, useEffect } from "react"
import { LengthControl } from "../LengthControl"
import { handleAudio } from "../../AudioPlayer"
import Presets from "../Presets/Presets"
import { ReactComponent as ResetIcon } from "../../../assets/icons/resetIcon.svg"
import { ReactComponent as SettingsIcon } from "../../../assets/icons/settingsIcon.svg"
import "./Timer.css"

export function Timer() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [labelDisplay, setLabelDisplay] = useState("Session 1")
  const intervalIdRef = useRef(null)

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
    document.title = `${formatTime(minutes, seconds)} - Pomodoro Clock | osmangund`
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

  const showHideSettings = () => {
    const settingsWrapper = document.getElementById("settings-wrapper")
    if (
      settingsWrapper.style.visibility === "hidden" ||
      !settingsWrapper.style.visibility
    ) {
      settingsWrapper.style.visibility = "visible"
      settingsWrapper.style.opacity = 1
      settingsWrapper.style.right = 0
      settingsWrapper.style.position = "relative"
    } else {
      settingsWrapper.style.visibility = "hidden"
      settingsWrapper.style.opacity = 0
      settingsWrapper.style.right = "800px"
      settingsWrapper.style.position = "absolute"
    }
  }

  const handleTimerLabel = (value) => {
    const timerLabel = document.getElementById("timer-label")
    const breakSpan = document.querySelector(".break-span")

    if (value === "break") {
      setLabelDisplay("Break")

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
    }
  }

  const stopInterval = () => {
    clearInterval(intervalIdRef.current)
    intervalIdRef.current = null
  }

  let timerDuration = 60 * sessionLength
  let sessionNum = 1
  let timerStatus

  const handleStartStop = () => {
    if (intervalIdRef.current === null) {
      handleAudio("stop")

      const id = setInterval(() => {
        if (timerDuration === 0) {
          handleAudio("play")

          if (timerStatus !== "break") {
            handleTimerLabel("break")
            timerDuration = breakLength * 60
            sessionNum += 1
            timerStatus = "break"
          } else {
            handleTimerLabel("session")
            timerDuration = sessionLength * 60
            timerStatus = "session"
          }
        } else {
          timerDuration -= 1
        }
        updateDisplay(timerDuration)
      }, 1000)

      intervalIdRef.current = id
    } else {
      stopInterval()
    }
  }

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
      <div id="timer">
        <div id="timer-label">
          <p>{labelDisplay}</p>
        </div>
        <p id="time-left"></p>
        <audio id="beep" loop preload="auto">
          <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        </audio>
        <button id="start_stop" onClick={() => handleStartStop()}>
          start
        </button>
        <button id="reset-icon" onClick={() => resetTimer()}>
          <ResetIcon className="icon" />
        </button>
        <button id="settings-icon" onClick={() => showHideSettings()}>
          <SettingsIcon className="icon" />
        </button>
      </div>
      <div id="settings-wrapper">
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
        <Presets setSession={setSessionLength} setBreak={setBreakLength} />
      </div>
    </>
  )
}
