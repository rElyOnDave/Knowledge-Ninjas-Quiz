// api array for quiz questions at all difficulties 
const apiArray = {
  easy: {
    url: "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple",
    image: "www.test.com/image.png",
  },
  medium: {
    url: "https://opentdb.com/api.php?amount=20&category=9&difficulty=medium&type=multiple",
    image: "www.test.com/image.png",
  },
  hard: {
    url: "https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple",
    image: "www.test.com/image.png",
  },
};

let currentQuestionIndex = 0;
let quizData;
const correctScoreElement = document.getElementById('correct-score');
const totalQuestionsElement = document.getElementById('total-questions');
const questionElement = document.getElementById('Question');
const answerButtons = document.querySelectorAll('.btn');
const checkAnswerButton = document.getElementById('check-answer');
const playAgainButton = document.getElementById('play-again');
let correctAnswer = "",
  correctScore = askedCount = 0,
  totalQuestion = 20;

// fetching difficulty function 
function fetchData(difficulty) {
  const url = apiArray[difficulty].url;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.status === 429) {
        console.log("You've made too many requests in a short period.");
        return;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      quizData = data.results;
      displayCurrentQuestion();
    })
    .catch((error) => console.error("Could not fetch quiz data:", error));
}

// current question function 
function displayCurrentQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = "";

  const currentQuestion = quizData[currentQuestionIndex];
  // display the question
  quizContent.innerHTML += `<h2>${currentQuestion.question}</h2>`;

  // display answer
  const optionsDiv = document.createElement("div");
  currentQuestion.incorrect_answers.forEach((incorrectAnswer) => {
    optionsDiv.innerHTML += `<label><input type="radio" name="q" value="${incorrectAnswer}">${incorrectAnswer}</label>`;
  });
  optionsDiv.innerHTML += `<label><input type="radio" name="q" value="${currentQuestion.correct_answer}">${currentQuestion.correct_answer}</label>`;
  quizContent.appendChild(optionsDiv);
}

function showQuestion(data) {
  let correctAnswer = data.correctAnswer;
  let incorrectAnswers = data.incorrect_answers;
  let optionList = [...incorrectAnswers]; // Make a copy to avoid modifying original array
  let randomIndex = Math.floor(Math.random() * (incorrectAnswers.length + 1)); // Generate random index
  // Insert correct answer at random index
  optionList.splice(randomIndex, 0, correctAnswer);
}

// start quiz function
function startQuiz(difficulty) {
  fetchData(difficulty);
}

//submit button 
function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="q"]:checked');
  if (!selectedAnswer) {
    alert('Please select an answer before submitting.');
  } else
    return;
}


// Add scoring here
currentQuestionIndex++;
if (currentQuestionIndex < quizData.length) {
  displayCurrentQuestion();
} else {
  alert('Quiz finished. You reached the end!');
}

// fetchData("easy");
// fetchData("medium");
// fetchData("hard");