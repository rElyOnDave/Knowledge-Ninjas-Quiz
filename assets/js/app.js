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

// 
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

function displayCurrentQuestion() {
  const quizContent = document.getElementById("quiz-content");
  quizContent.innerHTML = ""; // Clear previous contents
  const currentQuestion = quizData[currentQuestionIndex]; 
  quizContent.innerHTML += `<div><p>${currentQuestion.question}</p>`;
  currentQuestion.incorrect_answers.forEach((incorrectAnswer) => {
    quizContent.innerHTML += `<label><input type="radio" name="q" value="${incorrectAnswer}">${incorrectAnswer}</label>`;
  });
  quizContent.innerHTML += `<label><input type="radio" name="q" value="${currentQuestion.correct_answer}">${currentQuestion.correct_answer}</label></div>`;
  quizContent.innerHTML += '<br><button onclick="submitAnswer()">Submit</button>';
}

function startQuiz(difficulty) {
  fetchData(difficulty);
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="q"]:checked');
  if (!selectedAnswer) {
    alert('Please select an answer before submitting.');
    return;
  }
  // Add your scoring logic here if needed
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    displayCurrentQuestion();
  } else {
    alert('Quiz finished. You reached the end!');
    // Add any additional logic or actions for when the quiz is complete
  }
}
// fetchData("easy");
// fetchData("medium");
// fetchData("hard");