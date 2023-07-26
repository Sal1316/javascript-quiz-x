var questions = [
  {
    question: "What is a Variable?",
    choices: [
      "A - A place store data.",
      "B - An airplane.",
      "C - A car.",
      "D - a train.",
    ],
    answer: "A - A place store data.",
  },
  {
    question: "What is an Array?",
    choices: [
      "A - A place store data.",
      "B - A collection of data.",
      "C - A car.",
      "D - a train.",
    ],
    answer: "B - A collection of data.",
  },
  {
    question: "What is an Object?",
    choices: [
      "A - A place store data.",
      "B - An airplane.",
      "C - A collection of properties with key value pairs.",
      "D - a train.",
    ],
    answer: "C - A collection of properties with key value pairs.",
  },
  {
    question:
      "How much would would a woodchuck chuck if a wood chuck could chuck wood?",
    choices: [
      "A - 90 punds",
      "B - 150 cubic yards",
      "C - 60 yards",
      "D - 361 cubic centimeters/ day",
    ],
    answer: "D - 361 cubic centimeters/ day",
  },
];
var questionIndex = 0;
var interval;
var timeLimit = 60;
var score = 0; // inital score.

//Event Handlers:
document
  .getElementById("highScoresLink")
  .addEventListener("click", getHighScores);
document.getElementById("startBtn").addEventListener("click", startQuiz);
document
  .getElementById("quizScreen")
  .addEventListener("click", multipleChoiceBtn);
document.getElementById("submit").addEventListener("click", submitScore);
document.getElementById("goBack").addEventListener("click", goBack);
document
  .getElementById("clearScores")
  .addEventListener("click", clearHighScores);
// clearHighScores vs clearHighScores() when adding parenthesis, it forces click event to run right away.

// functions:
function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block"; // block is the default.
  document.getElementById("scoreboardScreen").style.display = "none";
  timerCountdown();
  renderNextQuestion();
}

function timerCountdown() {
  interval = setInterval(function () {
    if (timeLimit > 1) {
      timeLimit--;
      document.getElementById("timer").innerText = "Time: " + timeLimit;
    }
  }, 1000);
}

function renderNextQuestion() {
  document.getElementById("answer").innerHTML = "";
  document.getElementById("answer").setAttribute("style", "none"); // get rid of the border-top line.

  if (questionIndex < 0 || questionIndex >= questions.length) {
    return;
  }
  var currentQuestion = questions[questionIndex];

  // sets the new question in the html
  document.getElementById("question").innerText = currentQuestion.question;
  for (var i = 1; i < 5; i++) {
    // populates buttons with choices array values, in questions array.
    document.getElementById("btn" + i).innerText =
      currentQuestion.choices[i - 1]; // [i - 1] bc btns id's start at 1. ex, btn1, btn2...
  }
}

function multipleChoiceBtn(event) {
  var correctChoice = questions[questionIndex].answer;
  console.log(correctChoice)
  var userChoice = event.target.innerText; // grabs the innertext from button

  if (event.target.nodeName === "BUTTON") {
    if (userChoice === correctChoice) {
      // correct choice selected.
      score++;
      document.getElementById("answer").innerText = "Correct Choice!";
      document
        .getElementById("answer")
        .setAttribute(
          "style",
          "color: green; font-style: italic; border-top: 1px solid grey;"
        );
    } else {
      //  wrong choice selected.
      timeLimit -= 10; // time penalty
      document.getElementById("answer").innerText = "Wrong Choice!";
      document
        .getElementById("answer")
        .setAttribute(
          "style",
          "color: red; font-style: italic; border-top: 1px solid grey;"
        );
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
      // ex, when 4 >= 4
      setTimeout(function () {
        document.getElementById("quizScreen").style.display = "none"; // hides quiz screen
        document.getElementById("endScreen").style.display = "block"; // shows endScreen

        document.getElementById(
          "finalScore"
        ).innerText = `Your final score is: ${score}`;
        console.log("Here are the final score: " + score);
      }, 1000);
      clearInterval(interval); // stops the timer.
    }
    setTimeout(renderNextQuestion, 700);
  }
}

function submitScore() {
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("scoreboardScreen").style.display = "block";

  var initials = document.getElementById("initials").value; // get values "initials" from input box.
  var scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push({ score, initials });

  localStorage.setItem("scores", JSON.stringify(scores));
  // window.location.reload(); // refreshes the page

  getHighScores();
}

function goBack() {
  startQuiz();
  window.location.reload();
}

function clearHighScores() {
  document.getElementById("hsInitialsList").style.display = "none";
}

function getHighScores() {
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.sort((a, b) => b.score - a.score); // sorts array with highest score at the top.

  document
  .getElementById("highScoresLink")
  .removeEventListener("click", getHighScores); // makes the link clickable only "once".

  for (var i = 0; i < scores.length; i++) {
      var li = document.createElement("li"); // create li
      li.innerText = `Initials: ${scores[i].initials}, Score: ${scores[i].score}`;
      document.getElementById("hsInitialsList").appendChild(li);
      console.log(li);
  }

  scoreboard = document.getElementById("startScreen").style.display = "none";
  scoreboard = document.getElementById("quizScreen").style.display = "none";
  scoreboard = document.getElementById("endScreen").style.display = "none";
  scoreboard = document.getElementById("scoreboardScreen").style.display =
    "block";
}

/* TODO: 

-consolidate getHighscores fx into show high scores bc they do the same things.














*/
