import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

export default function StartScreen() {
    const [formData, setFormData] = useState({
        numberOfQuestions: 0,
        category: "",
        difficulty: "",
        type: ""
    })
    
    function formUpdate(ev) {
        console.log(ev.target.value)
    }
    
    return (
        <>
            <h1>Quiz</h1>
            <form className="settings">
                <div className="setting">
                    <label htmlFor="numberOfQuestions">Number of Questions</label>
                    <input
                        type="number"
                        className="form-control"
                        name="numberOfQuestions"
                        defaultValue={10}
                        onChange={formUpdate}
                    />
                </div>

                <div className="setting">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        onChange={formUpdate}
                    >
                        <option value="">Any category</option>
                        <option value="9">General knowledge</option>
                        <option value="17">Science and nature</option>
                        <option value="18">Computers</option>
                        <option value="28">Vehicles</option>
                    </select>
                </div>

                <div className="setting">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                        className="form-select"
                        name="difficulty"
                        onChange={formUpdate}
                    >
                        <option value="">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="setting">
                    <label htmlFor="type">Type</label>
                    <select
                        className="form-select"
                        name="type"
                        onChange={formUpdate}
                    >
                        <option value="">Any type</option>
                        <option value="multiple">Multiple choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>
            </form>
            <button 
                className="btn btn-primary start-btn"
            >
                Start
            </button>
        </>
    )
}