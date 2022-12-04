import { useContext } from "react"
import { ShowAnswersContext } from "../routes/Quiz"

export default function Answer(props) {
    const showAnswers = useContext(ShowAnswersContext);
    console.log(props.componentStyle);

    let classNames = "answer"
    if (!showAnswers && props.isSelected) {
        classNames += " selected"
    }
    

    return (
        <div
            className={classNames}
            onClick={() => props.setSelectedAnswerId(props.id)}
        >
            {props.answer}
        </div>
    )
}