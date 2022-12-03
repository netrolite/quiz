export default function Question(props) {
    console.log(props.difficulty)
    
    return (
            <div className="question">
            <p>{props.type}</p>
            <p>{props.difficulty}</p>
            <p>{props.question}</p>
        </div>
    )
}