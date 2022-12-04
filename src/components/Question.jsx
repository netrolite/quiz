import { useState, useContext } from "react";
import { ShowAnswersContext } from "../routes/Quiz";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const showAnswers = useContext(ShowAnswersContext)

    const answersNodes = props.allAnswers.map((item, index) => {
        // componentStyle is used to determine how to display each answer when "Check Answers" button is clicked
        // incorrect answers are red, correct are green, others stay the same (that's what initial null value is used for)
        let componentStyle = null;
        if (showAnswers && index === selectedAnswerId && item.isCorrect) {
            componentStyle = "correct"
        }
        else if (showAnswers && index === selectedAnswerId && !item.isCorrect) {
            componentStyle = "incorrect"
        }

        return <Answer
            answer={item.answer}
            componentStyle={componentStyle}
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
            <div className="answers">
                {answersNodes}
            </div>
        </div>
    )
}