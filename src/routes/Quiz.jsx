import { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import { fetchData, endQuiz, resetAnswered, setAnsweredItemToTrue } from "../components/functions";
import Question from "../components/Question";

export const ShowAnswersContext = createContext();

export default function Quiz(props) {
    // will be fetched from an api
    const [questionsData, setQuestionsData] = useState();
    // whether questions should display their correct answers
    const [showAnswers, setShowAnswers] = useState(false);
    // how many questions user got right
    const [score, setScore] = useState(0);
    // list of all questions and if user has answered them
    // { 0: false, 1: true: 2: false: 3: false }
    // would mean that only second question is answered
    // this is used to determine whether to make "Check Answers" button clickable or not
    const [answered, setAnswered] = useState({});
    // if user hasn't answered all the questions but tries to click "Check Answers", this would be set to true and trigger a popup at the top
    const [didntAnswerAllPopupShow, setDidntAnswerAllPopupShow] = useState(false);

    // determine if all the questions are answered
    let hasAnsweredAll;
    if (Object.values(answered).every(item => item === true)) {
        hasAnsweredAll = true
    }
    else hasAnsweredAll = false;

    // resets "answered" to be all false
    // runs when "questionsData" changes
    // "questionsData" only changes when data is received from the api
    useEffect(() => {
        // if received the questions from the api
        if (questionsData) {
            resetAnswered(questionsData, setAnswered);
        }
    }, [questionsData])

    // fetch data on component mount
    useEffect(() => {
        fetchData(props.formData, setQuestionsData);
    }, [])

    // start a new quiz
    // runs when "Start Over" button is clicked
    function startOver() {
        setQuestionsData();
        setShowAnswers(false);
        setScore(0);
        setAnswered({});
        fetchData(props.formData, setQuestionsData);
    }

    //-------------------------------------//
    // NODES

    let questionsNodes;
    let buttonsNodes;

    // if the questions data is received, populate questionsNodes and buttonsNodes.
    // Otherwise, set questionsNodes to "Loading...", and leave buttonsNodes undefined
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

        // if "Check Answers" is clicked, show "New Quiz" and "Start Over" buttons
        if (showAnswers) {
            buttonsNodes = (
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
            )
        } 
        // Otherwise, show "Check Answers" button only
        else {
            buttonsNodes = (
                <button
                    className={
                        "btn btn-primary fullwidth"
                        + (!hasAnsweredAll ? " disabled" : "")
                    }
                    onClick={() => {
                        endQuiz(
                            setShowAnswers,
                            hasAnsweredAll,
                            setDidntAnswerAllPopupShow,
                            answered,
                            setScore
                        )
                    }}
                >
                        Check Answers
                </button>
            )
        }
    } else {
        questionsNodes = <p>Loading...</p>
    }

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
                {buttonsNodes}
            </div>
        </>
    )
}