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

function endQuiz(setShowAnswers) {
    setShowAnswers(true);
}

export {
    formUpdate,
    selectAnswer,
    htmlDecode,
    endQuiz
}