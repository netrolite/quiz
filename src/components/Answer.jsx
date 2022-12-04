import { useContext } from "react"
import { selectAnswer, htmlDecode } from "./functions";
import { ShowAnswersContext } from "../routes/Quiz"

export default function Answer(props) {
    const showAnswers = useContext(ShowAnswersContext);

    let classNames = "answer"
    if (!showAnswers && props.isSelected) {
        classNames += " selected"
    }
    else if (props.answerStyle === "correct") {
        classNames += " correct"
    }
    else if (props.answerStyle === "incorrect") {
        classNames += " incorrect"
    }

    const formattedAnswer = htmlDecode(props.answer)

    return (
        <div
            className={classNames}
            onClick={() => selectAnswer(showAnswers, props.setSelectedAnswerId, props.id)}
        >
            {formattedAnswer}
        </div>
    )
}