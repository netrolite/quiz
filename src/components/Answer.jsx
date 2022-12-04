export default function Answer(props) {
    console.log(props);
    return (
        <div
            className={"answer" + (props.isSelected ? " selected" : "")}
            onClick={() => props.setSelectedAnswerId(props.id)}
        >
            {props.answer}
        </div>
    )
}