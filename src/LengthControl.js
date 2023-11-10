export function LengthControl(props) {
    return (
        <div className="length-control">
            <p className="border-bottom" id={`${props.event}-label`}>{props.event} Length</p>
            <button id={`${props.event}-decrement`} onClick={props.handleValue}>
            <i className="fa fa-arrow-down" />
            </button>
            <p id={`${props.event}-length`}>{props.length}</p>
            <button id={`${props.event}-increment`} onClick={props.handleValue}>
            <i className="fa fa-arrow-up" />
            </button>
    </div>

    )
}