var questions = [
  {
    question: "What is a Variable?",
    choices: [
      "A - A place store data.",
      "B - An airplane.",
      "C - A car.",
      "D - a train.",
    ],
    answer: "A",
  },
  {
    question: "What is an Array?",
    choices: [
      "A - A place store data.",
      "B -  A collection of data.",
      "C - A car.",
      "D - a train.",
    ],
    answer: "B",
  },
  {
    question: "What is an Object?",
    choices: [
      "A - A place store data.",
      "B - An airplane.",
      "C - A collection of properties with key value pairs.",
      "D - a train.",
    ],
    answer: "C",
  },
];
var questionIndex = 0;
var interval;
var timeLimit = 60;

// render() changes the element with the current question, and changes the button choice text.
function render() {
  var currentQuestion = questions[questionIndex];
  document.getElementById("question").innerText = currentQuestion.question;
  for (var i = 1; i < 5; i++) { // popuates buttons with letter choices.
    document.getElementById("btn" + i).innerText =
      currentQuestion.choices[i - 1];
  }
}

function startTimer() {
  interval = setInterval(function () {
    if (timeLimit > 1) {
      timeLimit--;
      document.getElementById("timer").innerText = "Time: " + timeLimit;
    }
  }, 1000);
}

document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block"; // block is the default.

  startTimer();
  render();
});

document
  .getElementById("quizScreen")
  .addEventListener("click", function (event) {
    if (event.target.nodeName === "BUTTON") {
      var choice = event.target.innerText;
      var correctChoice = questions[questionIndex].answer;
      if (choice !== correctChoice) {
        timeLimit -= 10; // penalty
      }
      questionIndex++;
      if (questionIndex >= questions.length) {
        console.log("Quiz ENded.");
        clearInterval(interval);
        document.getElementById("quizScreen").style.display = "none";
        document.getElementById("endScreen").style.display = "block";

        return;
      }
      render();
    }
  });

// after entering initial in HighScores, submit.
document.getElementById("submit").addEventListener("click", function () {
  var initials = document.getElementById("initials").value;
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ timeLimit, initials });
  console.log("scores: ", scores);
  localStorage.setItem("scores", JSON.stringify(scores));
  window.location.reload(); // refreshes the page
});
