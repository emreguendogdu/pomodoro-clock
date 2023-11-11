export function Timer(props) {
    return (
        <div id="timer">
            <p id="timer-label" className="border-bottom">
              {props.display}
              <span className="break-span">
                {props.isSession 
                  ? ""
                  : `(Next session: ${props.sessionNum})`}
              </span>
            </p>
            <p id="time-left">{`${props.sessionLength}:00`}</p>
            <audio id="beep" loop="true" preload="auto">
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