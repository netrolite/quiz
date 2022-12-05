function formUpdate(ev, setFormData) {
    setFormData(prevState => ({
        ...prevState,
        [ev.target.name]: ev.target.value
    }))
}

function selectAnswer(showAnswers, setSelectedAnswerId, id) {
    if (!showAnswers) {
        setSelectedAnswerId(id);
    }
}

// decode html entities. E.g: "&amp;" => "&"
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

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

function fetchData(formData, setQuestionsData) {
    // generate api url based on user input
    const {numberOfQuestions, category, difficulty, type} = formData;
    let fetchUrl = "https://opentdb.com/api.php?";

    // number of questions
    if (numberOfQuestions) fetchUrl += `amount=${numberOfQuestions}`
    // if not provided, default to 10
    else fetchUrl += "amount=10"
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

export {
    formUpdate,
    selectAnswer,
    htmlDecode,
    endQuiz,
    fetchData
}