import { useState } from "react";
import Answer from "./Answer";

export default function Question(props) {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);

    // randomize array order
    function shuffle(arr) {
        let currLen = arr.length;
        let randomIndex;
        let shuffledArr = [];

        while (currLen > 0) {
            randomIndex = Math.floor(Math.random() * currLen);
            shuffledArr.push(arr[randomIndex])
            arr.splice(randomIndex, 1);
            currLen--;
        }

        return shuffledArr;
    }

    let answers = props.incorrectAnswers.map(item => ({
        content: item,
        isCorrect: false,
    }));
    answers.push({
        content: props.correctAnswer,
        isCorrect: true,
    });
    const answersShuffled = shuffle(answers);

    const answersNodes = answersShuffled.map((item, index) => (
        <Answer
            content={item.content}
            isCorrect={item.isCorrect}
            setSelectedAnswerId={setSelectedAnswerId}
            isSelected={selectedAnswerId === index ? true : false}
            id={index}
            key={index}
        />
    ))

    return (
        <div className="question-wrapper">
            <p className="question">{props.question}</p>
            <div className="answers">
                {answersNodes}
            </div>
        </div>
    )
}