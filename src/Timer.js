export function Timer(props) {
    return (
        <div id="timer">
          <div id="label-container">
            <p id="timer-label" className="border-bottom">
              {props.labelDisplay}
            </p>
          </div>
            <p id="time-left"></p>
            <audio id="beep" loop preload="auto">
              <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </audio>
            <button id="start_stop" onClick={props.handleStartStop}>
              Start/Stop
            </button>
            <button id="reset" onClick={props.handleReset}>
              Reset
            </button>
          </div>
    )
}