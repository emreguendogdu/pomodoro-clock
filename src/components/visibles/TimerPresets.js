import React from "react"

export default function TimerPresets(props) {
  function showPresets() {
    document.getElementById("presets-container").style.opacity = "1"
    document.getElementById("presets-container").style.height = "auto"
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
      <p onMouseOver={() => showPresets()}>
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
