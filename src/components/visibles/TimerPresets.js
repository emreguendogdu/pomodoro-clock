import React from "react"

export default function TimerPresets(props) {
  const showPresets = () => {
    const presetsContainer = document.getElementById("presets-container")
    presetsContainer.style.opacity = "1"
    presetsContainer.style.height = "auto"
  }
  const hideShowPresets = () => {
    const presetsContainer = document.getElementById("presets-container")

    if (presetsContainer.style.opacity === "1") {
      presetsContainer.style.opacity = "0"
      presetsContainer.style.height = "0"
    } else {
      presetsContainer.style.opacity = "1"
      presetsContainer.style.height = "auto"
    }
  }

  const TimerPreset = (props) => {
    return (
      <>
        <button
          id={`${props.s}-${props.b}-preset`}
          onClick={() => {
            props.setS(props.s)
            props.setB(props.b)
          }}
        >
          {props.s}-{props.b}
        </button>
      </>
    )
  }
  return (
    <section id="presets-section">
      <p
        onMouseOver={() => showPresets()}
        onClick={() => hideShowPresets()}
      >
        Presets <i className="fa fa-caret-down" aria-hidden="true" />
      </p>
      <div id="presets-container">
        <TimerPreset
          s="50"
          b="10"
          setS={props.setSession}
          setB={props.setBreak}
        />
        <TimerPreset
          s="60"
          b="10"
          setS={props.setSession}
          setB={props.setBreak}
        />
        <TimerPreset
          s="25"
          b="5"
          setS={props.setSession}
          setB={props.setBreak}
        />
      </div>
    </section>
  )
}
