const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual a velocidade da luz?",
    answers: [
      { text: " 300 000 000 metros por segundo (m/s)", correct: false },
      { text: "150 000 000 metros por segundo (m/s)", correct: false },
      { text: "299 792 458 metros por segundo (m/s)", correct: true },
      { text: "199 792 458 metros por segundo (m/s)", correct: false }
    ]
  },
  {
    question: "De qual linguagem de programação pertence o comando if?",
    answers: [
      { text: "C", correct: true },
      { text: "HTML", correct: false },
      { text: "jAVA", correct: false },
      { text: "TODAS AS ALTERNATIVAS", correct: false }
    ]
  },
  {
    question: '"Qual o maior animal terrestre?"',
    answers: [
      { text: 'Elefante Africano', correct: true },
      { text: 'Elefante Indiano', correct: false },
      { text: 'Baleia Azul', correct: false },
      { text: "Tubarão Baleia", correct: false }
    ]
  },
  {
    question: 'O coração artificial foi inventado no Brasil?',
    answers: [
      { text: "Falso", correct: false },
      { text: "Verdadeiro", correct: true }
    ]
  },
  {
    question: 'Gaara foi capturado por quais integrantes da Akatisuke?',
    answers: [
      { text: 'Gaara nunca foi capturado', correct: false },
      { text: 'Sasori e Deidara', correct: true },
      { text: 'Itachi e kizame', correct: false },
      { text: 'Pein e Konan', correct: false }
    ]
  },
  {
    question: 'Qual o filme brasileiro mais assistido no mundo?',
    answers: [
      { text: 'Minha Mãe É Uma Peça 3', correct: false },
      { text: 'Nada a Perder', correct: true },
      { text: 'Cidade de Deus', correct: false },
      { text: 'Os Dez Mandamentos  ', correct: false }
    ]
  },
  {
    question: 'Em que oceano fica Madagascar?',
    answers: [
      { text: 'Oceano Atlântico', correct: false },
      { text:'Oceano Pacífico', correct: false },
      { text: 'Oceano Antártico', correct: false },
      { text: 'Oceano Índico', correct: true },
    ]
  },
]