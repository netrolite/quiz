import { useState, useContext, useEffect } from "react";
import { ShowAnswersContext } from "../routes/Quiz";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const showAnswers = useContext(ShowAnswersContext)

    useEffect(() => {
        // 0 is a falsy value
        if (selectedAnswerId >= 0) {
            props.setAnswered(prevState => (
                {
                    ...prevState,
                    [props.id]: true
                }
            ))
        }
    }, [selectedAnswerId])

    // if showAnswers is true, check if user answered correctly, and if so, add 1 to score
    useEffect(() => {
        if (showAnswers) {
            props.allAnswers.forEach((item, index) => {
                if (index === selectedAnswerId && item.isCorrect) {
                    props.setScore(prevState => prevState + 1);
                }
            })
        }
    }, [showAnswers])

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
            <div className={"answers"}>
                {answersNodes}
            </div>
        </div>
    )
}