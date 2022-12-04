import { useState, useEffect } from "react";
import Question from "../components/Question";
import "bootstrap/dist/css/bootstrap.min.css"

export default function Quiz(props) {
    const [questionsData, setQuestionsData] = useState([]);

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
                        question: item.question,
                        allAnswers: allAnswers,
                    }
                }))
            })
    }, [])

    const questionsNodes = questionsData.map((item, index) => (
        <Question 
            question={item.question}
            allAnswers={item.allAnswers}
            key={index}
        />
    ))
    
    return (
        <>
            <h1>Quiz</h1>
            <div className="questions">
                {
                    questionsData.length
                    ?
                    questionsNodes
                    :
                    "Loading..."
                }
            </div>
        </>
    )
}