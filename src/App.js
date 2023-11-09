import './App.scss';

export default function App() {
  return (
    <>
    <div id="forest"></div>
    <div id="app-container">
      <div id="app">
        <div className="length-control">
          <p id="break-label">Break Length</p>
          <button id="break-increment"></button>
          <p id="break-length">5</p>
          <button id="break-decrement"></button>
        </div>
        <div className="length-control">
          <p id="session-label">Session Length</p>
            <button id="session-increment"></button>
          <p id="session-length">25</p>
            <button id="session-decrement"></button>
        </div>
        <div id="timer">
          <p id="timer-label">Session x</p>
          <p id="time-left">00:00</p>
          <button id="start_stop">Start/Stop</button>
          <button id="reset">Reset</button>
        </div>
      </div>
    </div>
    </>
  );
}
