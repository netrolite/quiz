import { useState, useContext, useEffect } from "react";
import { ShowAnswersContext } from "../routes/Quiz";
import { setAnsweredItemToTrue, calculateScore } from "./functions";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState();
    const showAnswers = useContext(ShowAnswersContext)

    // calculate score
    useEffect(() => {
        if (showAnswers) {
            calculateScore(props.allAnswers, selectedAnswerId, props.setScore);
        }
    }, [showAnswers])

    // if user has selected an option, set setAnsweredItemToTrue to true for this question
    useEffect(() => {
        if (selectedAnswerId >= 0) {
            setAnsweredItemToTrue(props.setAnswered, props.id)
        }
    }, [selectedAnswerId])

    const answersNodes = props.allAnswers.map((item, index) => {
        const isSelected = index === selectedAnswerId;
        // answerStyle is used to determine how to display each answer when "Check Answers" button is clicked
        // correct answers are green, incorrect are red, others stay the same (that's what initial null value is used for)
        let answerStyle = null;
        // always show the correct option no matter if it's selected or not
        if (showAnswers && item.isCorrect) {
            answerStyle = "correct"
        }
        // only show the incorrect option if it's selected
        else if (showAnswers && isSelected && !item.isCorrect) {
            answerStyle = "incorrect"
        }

        return <Answer
            answer={item.answer}
            answerStyle={answerStyle}
            isSelected={isSelected}
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