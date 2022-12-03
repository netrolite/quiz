import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default function Quiz(props) {
    const [questions, setQuestions] = useState(null);

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
                setQuestions(data)
            })
    }, [])
    
    return (
        <>
            <h1>Quiz</h1>
            <div className="questions">
                {
                    questions
                    ?
                    "questions"
                    :
                    "Loading..."
                }
            </div>
        </>
    )
}