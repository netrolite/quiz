import React, { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import { fetchData, endQuiz } from "../components/functions";
import Question from "../components/Question";
import "bootstrap/dist/css/bootstrap.min.css"

export const ShowAnswersContext = createContext();

export default function Quiz(props) {
    const [questionsData, setQuestionsData] = useState();
    const [showAnswers, setShowAnswers] = useState(false);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState({});
    const [didntAnswerAllPopupShow, setDidntAnswerAllPopupShow] = useState(false);

    let hasAnsweredAll;
    if (Object.values(answered).every(item => item === true)) {
        hasAnsweredAll = true
    }
    else hasAnsweredAll = false;

    useEffect(() => {
        if (questionsData) {
            // used to determine whether the user has answered all the questions
            // would look like:
            // {0: false, 1: false, 2: true, 3: false}
            let listOfAnswered = {}
            for (let i in questionsData) {
                listOfAnswered[i] = false
            }

            setAnswered(listOfAnswered);
        }
    }, [questionsData])

    useEffect(() => {
        fetchData(props.formData, setQuestionsData);
    }, [])

    function startOver() {
        setQuestionsData();
        setShowAnswers(false);
        fetchData(props.formData, setQuestionsData);
    }

    

    let questionsNodes;
    let buttons;

    // if the questions data is received, fill questionsNodes with question components and fill buttonsAndScore with some data as well
    // otherwise, set questionsNodes to "Loading...", and leave buttonsAndScore undefined
    if (questionsData) {
        questionsNodes = questionsData.map((item, index) => (
            <Question 
                question={item.question}
                allAnswers={item.allAnswers}
                setAnswered={setAnswered}
                setScore={setScore}
                id={index}
                key={index}
            />
        ))
        questionsNodes = (
            <ShowAnswersContext.Provider value={showAnswers}>
                {questionsNodes}
            </ShowAnswersContext.Provider>
        )

        buttons = (
            <>
                {
                    showAnswers
                    ?
                    <>
                        <Link to="/">
                            <button
                                className={
                                    "btn btn-primary fullwidth"
                                }
                            >
                                New Quiz
                            </button>
                        </Link>
                        <button
                                className={
                                    "btn btn-primary fullwidth"
                                }
                                onClick={startOver}
                            >
                                Start Over
                        </button>
                    </>
                    :
                    <button
                        className={
                            "btn btn-primary fullwidth"
                            + (!hasAnsweredAll ? " disabled" : "")
                        }
                        onClick={
                            () => endQuiz(
                                setShowAnswers,
                                hasAnsweredAll,
                                setDidntAnswerAllPopupShow,
                                answered,
                                setScore
                            )
                        }
                    >
                        Check Answers
                    </button>
                }
            </>
        )
    }
    else {
        questionsNodes = <p>Loading...</p>
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className={"popup" + (didntAnswerAllPopupShow ? " active" : "")}>
                <p>You have to answer all the questions first!</p>
            </div>

            <h1>Quiz</h1>

            <div className={"questions" + (showAnswers ? " answers-disabled" : "")}>
                {questionsNodes}
            </div>

            <div className="score">
                {
                    showAnswers
                    &&
                    <p>You scored {score}/{questionsData.length} correct answers!</p>
                }
            </div>

            <div className="buttons fullwidth">
                {buttons}
            </div>
        </>
    )
}