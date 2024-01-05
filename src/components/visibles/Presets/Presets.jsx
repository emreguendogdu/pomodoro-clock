import "./Presets.css"
export default function TimerPresets(props) {
  const setSession = props.setSession
  const setBreak = props.setBreak

  const TimerPreset = (props) => {
    return (
      <>
        <button
          id={`${props.s}-${props.b}-preset`}
          onClick={() => {
            setSession(+props.s)
            setBreak(+props.b)
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
        <TimerPreset s="25" b="5" />
        <TimerPreset s="50" b="10" />
        <TimerPreset s="60" b="10" />
        <TimerPreset s="90" b="10" />
      </div>
    </section>
  )
}
