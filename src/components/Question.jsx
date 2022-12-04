import { useState } from "react";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);

    const answersNodes = props.allAnswers.map((item, index) => {
        return <Answer
            answer={item.answer}
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