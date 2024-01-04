import "./Presets.css"
export default function TimerPresets(props) {
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
          {props.s} - {props.b}
        </button>
      </>
    )
  }
  return (
    <section id="presets-section">
      <div id="presets-container">
        <TimerPreset
          s="25"
          b="5"
          setS={props.setSession}
          setB={props.setBreak}
        />
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
          s="90"
          b="10"
          setS={props.setSession}
          setB={props.setBreak}
        />
      </div>
    </section>
  )
}
