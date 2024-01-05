import { ReactComponent as SettingsIcon } from "../../../assets/icons/settingsIcon.svg"
import { LengthControl } from "../LengthControl"
import Presets from "../Presets/Presets"

export default function TimerSettings(props) {
  const showHideSettings = () => {
    const settingsWrapper = document.getElementById("settings-wrapper")

    if (settingsWrapper.classList.contains("hidden")) {
      settingsWrapper.classList.replace("hidden", "visible")
    } else if (settingsWrapper.classList.contains("visible")) {
      settingsWrapper.classList.replace("visible", "hidden")
    }
  }

  return (
    <>
      <button id="settings-icon" onClick={() => showHideSettings()}>
        <SettingsIcon className="icon" />
      </button>
      <div id="settings-wrapper" className="hidden">
        <div className="length-container">
          <LengthControl
            event="session"
            length={props.sessionLength}
            setSessionLength={props.setSessionLength}
          />
          <LengthControl
            event="break"
            length={props.breakLength}
            setBreakLength={props.setBreakLength}
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
