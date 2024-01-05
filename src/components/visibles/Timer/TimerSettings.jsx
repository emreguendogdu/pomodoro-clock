import { ReactComponent as SettingsIcon } from "../../../assets/icons/settingsIcon.svg"
import { LengthControl } from "../LengthControl"
import Presets from "../Presets/Presets"

export default function TimerSettings(props) {
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

  const sessionIncrement = (setSessionLength) => {
    setSessionLength((prev) => (prev < 60 ? prev + 1 : prev))
  }
  const sessionDecrement = (setSessionLength) => {
    setSessionLength((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const breakIncrement = (setBreakLength) => {
    setBreakLength((prev) => (prev < 60 ? prev + 1 : prev))
  }
  const breakDecrement = (setBreakLength) => {
    setBreakLength((prev) => (prev > 1 ? prev - 1 : prev))
  }

  return (
    <>
      <button id="settings-icon" onClick={() => showHideSettings()}>
        <SettingsIcon className="icon" />
      </button>
      <div id="settings-wrapper">
        <div className="length-container">
          <LengthControl
            event="session"
            length={props.sessionLength}
            handleIncrement={sessionIncrement}
            handleDecrement={sessionDecrement}
          />
          <LengthControl
            event="break"
            length={props.breakLength}
            handleIncrement={breakIncrement}
            handleDecrement={breakDecrement}
          />
        </div>
        <Presets
          setSession={props.setSessionLength}
          setBreak={props.setBreakLength}
        />
      </div>
    </>
  )
}
