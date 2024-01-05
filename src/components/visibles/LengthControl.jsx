export function LengthControl(props) {

  function handleIncrement() {
    if (props.event === "session") {
      props.setSessionLength((prev) => (prev < 60 ? prev + 1 : prev))
    }
    if (props.event === "break") {
      props.setBreakLength((prev) => (prev < 60 ? prev + 1 : prev))
    }
  }
  function handleDecrement() {
    if (props.event === "session") {
      props.setSessionLength((prev) => (prev > 1 ? prev - 1 : prev))
    }
    if (props.event === "break") {
      props.setBreakLength((prev) => (prev > 1 ? prev - 1 : prev))
    }
  }

  function handleValues(event) {
    const type = event.target.dataset.type
    type === "increment" ? handleIncrement() : handleDecrement()
  }

  return (
    <div className="length-control">
      <p id={`${props.event}-label`}>{props.event} Length</p>
      <button
        id={`${props.event}-decrement`}
        onClick={(event) => handleValues(event)}
        data-type="decrement"
      >
        <i className="fa fa-arrow-down" />
        {/* This icons has pointer events none on CSS */}
      </button>
      <p id={`${props.event}-length`}>{props.length}</p>
      <button
        id={`${props.event}-increment`}
        onClick={(event) => handleValues(event)}
        data-type="increment"
      >
        <i className="fa fa-arrow-up" />
      </button>
    </div>
  )
}
