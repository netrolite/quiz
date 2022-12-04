import { useState, useEffect, createContext } from "react";
import { htmlDecode, endQuiz } from "../components/functions";
import Question from "../components/Question";
import "bootstrap/dist/css/bootstrap.min.css"

export const ShowAnswersContext = createContext();

export default function Quiz(props) {
    const [questionsData, setQuestionsData] = useState();
    const [showAnswers, setShowAnswers] = useState(false)
    const [score, setScore] = useState()

    useEffect(() => {
        // generate api url based on user input
        const {numberOfQuestions, category, difficulty, type} = props.formData
        let fetchUrl = "https://opentdb.com/api.php?"

        // number of questions
        if (numberOfQuestions) fetchUrl += `amount=${numberOfQuestions}`
        // if not provided, default to 10
        else fetchUrl += "amount=10000000000000"

        // category
        if (category !== "any") fetchUrl += `&category=${category}`

        // difficulty
        if (difficulty !== "any") fetchUrl += `&difficulty=${difficulty}`

        // type
        if (type !== "any") fetchUrl += `&type=${type}`

        fetch(fetchUrl)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                setQuestionsData(data.results.map(item => {
                    // create an array of all answers, where the correct answer is put at a random index
                    let allAnswers = item.incorrect_answers.map(item => ({
                        answer: item,
                        isCorrect: false,
                        isSelected: false
                    }));
                    const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
                    allAnswers.splice(
                        randomIndex,
                        0,
                        {
                            answer: item.correct_answer,
                            isCorrect: true,
                            isSelected: false,
                        }
                    );

                    return {
                        question: htmlDecode(item.question),
                        allAnswers: allAnswers,
                    }
                }))
            })
    }, [])

    

    let questionsNodes;
    let buttonsAndScore;

    // if the questions data is received, fill questionsNodes with question components and fill buttonsAndScore with some data as well
    // otherwise, set questionsNodes to "Loading...", and leave buttonsAndScore undefined
    if (questionsData) {
        questionsNodes = questionsData.map((item, index) => (
            <Question 
                question={item.question}
                allAnswers={item.allAnswers}
                key={index}
            />
        ))
        questionsNodes = (
            <ShowAnswersContext.Provider value={showAnswers}>
                {questionsNodes}
            </ShowAnswersContext.Provider>
        )

        buttonsAndScore = (
            <div className="buttons-and-score">
                {showAnswers
                &&
                <div className="score">
                    {score}
                </div>
                }
                <button
                    className="btn btn-primary check-answers-btn"
                    onClick={() => endQuiz(setShowAnswers)}
                >
                    Check Answers
                </button>
            </div>
        )
    }
    else {
        questionsNodes = <p>Loading...</p>
    }

    return (
        <>
            <h1>Quiz</h1>
            <div className={"questions" + (showAnswers ? " answers-disabled" : "")}>
                {questionsNodes}
            </div>
            {buttonsAndScore}
        </>
    )
}