export const TimerPreset = (props) => {
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