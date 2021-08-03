const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerElement = document.getElementById('timer')
var count = 60

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    var x = setInterval(function () {
        if (count == 0) {
            alert('Times Up!')
            startGame()
            count = 60
            clearInterval(x)
        }
        else {
            timerElement.innerHTML = count--
        }
    }, 1000)
    timerElement.innerHTML = count--
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<js>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<java>', correct: false }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function myFunction() ', correct: true },
            { text: 'function = myFunction()', correct: false },
            { text: 'function(myFunction)', correct: false }
        ]
    },
    {
        question: 'How does a FOR loop start',
        answers: [
            { text: 'for (i <= 5; i++)', correct: false },
            { text: 'for i = 1 to 5', correct: false },
            { text: 'for (i = 0; i <= 5)', correct: false },
            { text: 'for (i = 0; i <= 5; i++)', correct: true }
        ]
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [
            { text: '"This is a comment', correct: false },
            { text: '<!--This is a comment-->', correct: false },
            { text: '//This is a comment', correct: true },
            { text: '**This is a comment**', correct: false }
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = ["red", "green", "blue"]', correct: true },
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
            { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World");', correct: true },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msg("Hello World");', correct: false }
        ]
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: [
            { text: 'onmouseover', correct: false },
            { text: 'onchange', correct: false },
            { text: 'onmouseclick', correct: false },
            { text: 'onclick', correct: true }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            { text: '*', correct: false },
            { text: '=', correct: true },
            { text: 'x', correct: false },
            { text: '-', correct: false }
        ]
    },
    {
        question: 'JavaScript is case-sensitive.',
        answers: [
            { text: 'True', correct: true },
            { text: 'False', correct: false }
        ]
    },
]
console.log(questions[1].answers[1].correct)

