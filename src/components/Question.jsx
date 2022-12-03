import Answer from "./Answer";

export default function Question(props) {
    const answers = [props.correctAnswer, ...props.incorrectAnswers];
    const answersShuffled = shuffle(answers);

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

    const answersNodes = answersShuffled.map((item, index) => (
        <Answer
            answerContent={item}
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