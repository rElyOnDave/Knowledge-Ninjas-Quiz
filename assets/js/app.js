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
        // Process your data and update the DOM here
        displayQuiz(data);
      })
      .catch((error) => console.error("Could not fetch quiz data:", error));
  }
  function displayQuiz(data) {
    const quizContent = document.getElementById("quiz-content");
    quizContent.innerHTML = ""; // Clear previous contents
    // Example: Display the questions or data in 'quiz-content' div
    // This is a very basic way to display the questions. Adjust according to your needs.
    data.results.forEach((item, index) => {
      quizContent.innerHTML += `<p>Q${index + 1}: ${item.question}</p>`;
    });
  }
  
  fetchData("easy");
  fetchData("medium");
  fetchData("hard");