import { useState, useContext } from "react";
import { ShowAnswersContext } from "../routes/Quiz";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const showAnswers = useContext(ShowAnswersContext)

    const answersNodes = props.allAnswers.map((item, index) => {
        // answerStyle is used to determine how to display each answer when "Check Answers" button is clicked
        // correct answers are green, incorrect are red, others stay the same (that's what initial null value is used for)
        let answerStyle = null;
        if (showAnswers && item.isCorrect) {
            answerStyle = "correct"
        }
        else if (showAnswers && index === selectedAnswerId && !item.isCorrect) {
            answerStyle = "incorrect"
        }

        return <Answer
            answer={item.answer}
            answerStyle={answerStyle}
            isSelected={index === selectedAnswerId ? true : false}
            setSelectedAnswerId={setSelectedAnswerId}
            id={index}
            key={index}
        />
    })

    return (
        <div className="question-wrapper">
            <p className="question">
                {props.question}
            </p>
            <div className={"answers"}>
                {answersNodes}
            </div>
        </div>
    )
}