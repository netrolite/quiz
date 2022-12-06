// controlled inputs thing
function formUpdate(ev, setFormData) {
    setFormData(prevState => ({
        ...prevState,
        [ev.target.name]: ev.target.value
    }))
}

// is run when an answer is clicked
function selectAnswer(showAnswers, setSelectedAnswerId, id) {
    if (!showAnswers) {
        setSelectedAnswerId(id);
    }
}

// decode html entities
// "&amp;" => "&"
function htmlDecode(input) {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

// is run when "Check Answers" is clicked
function endQuiz(setShowAnswers, hasAnsweredAll, setDidntAnswerAllPopupShow) {
    // if every question is answered, show correct answers
    if (hasAnsweredAll) {
        setShowAnswers(true);
    }
    else {
        setDidntAnswerAllPopupShow(true);
        setTimeout(() => {
            setDidntAnswerAllPopupShow(false);
        }, 1200);
    }
}

// is run when quiz starts
function fetchData(formData, setQuestionsData) {
    // generate api url based on user input
    const {numberOfQuestions, category, difficulty, type} = formData;
    let fetchUrl = "https://opentdb.com/api.php?";

    // number of questions
    // if the user left "Number of questions" input empty, its value defaults to an emtpy string (which is false)
    if (numberOfQuestions) fetchUrl += `amount=${numberOfQuestions}`
    // if not provided (an empty string), default to 5
    else fetchUrl += "amount=5"
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
                    allAnswers: allAnswers
                }
            }))
        })
}

// if user has selected an option, set answered to true for that question
// 0 is a falsy value
function setAnsweredItemToTrue(setAnswered, id) {
    setAnswered(prevState => (
        {
            ...prevState,
            [id]: true
        }
    ))
}

// this is passed to every question
// checks if user answered correctly
// if so, increments score by 1
function calculateScore(allAnswers, selectedAnswerId, setScore) {

    allAnswers.map((item, index) => {
        if (index === selectedAnswerId && item.isCorrect) {
            setScore(prevState => prevState + 1);
        }
    })
}

// run when quiz starts
// resets answered
// answered would look like:
// { 0: false, 1: false, 2: false, 3: false }
function resetAnswered(questionsData, setAnswered) {
    let listOfAnswered = {}
    for (let i in questionsData) {
        listOfAnswered[i] = false
    }

    setAnswered(listOfAnswered);
}

export {
    formUpdate,
    selectAnswer,
    htmlDecode,
    endQuiz,
    fetchData,
    setAnsweredItemToTrue,
    calculateScore,
    resetAnswered
}