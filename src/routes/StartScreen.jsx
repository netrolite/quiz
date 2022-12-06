import { formUpdate } from "../components/functions";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default function StartScreen(props) {
    const { numberOfQuestions, category, difficulty, type } = props.formData
    
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
                        value={numberOfQuestions}
                        onChange={ev => formUpdate(ev, props.setFormData)}
                        max="50"
                        min="1"
                    />
                </div>

                <div className="setting">
                    <label htmlFor="category">Category</label>
                    <select
                        className="form-select"
                        name="category"
                        onChange={ev => formUpdate(ev, props.setFormData)}
                        value={category}
                    >
                        <option value="any">Any Category</option>
			            <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="32">Entertainment: Cartoon & Animations</option>
                        <option value="31">Entertainment: Japanese Anime & Manga</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                    </select>
                </div>

                <div className="setting">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                        className="form-select"
                        name="difficulty"
                        onChange={ev => formUpdate(ev, props.setFormData)}
                        value={difficulty}
                    >
                        <option value="any">Any difficulty</option>
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
                        onChange={ev => formUpdate(ev, props.setFormData)}
                        value={type}
                    >
                        <option value="any">Any type</option>
                        <option value="multiple">Multiple choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>
            </form>
            <Link to="/quiz">
                <button
                    className="btn btn-primary fullwidth"
                >
                    Start
                </button>
            </Link>
        </>
    )
}