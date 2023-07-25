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
];
var questionIndex = 0;
var interval;
var timeLimit = 60;
var score = 0;  // inital score.

//Event Handlers: 
document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("quizScreen").addEventListener("click", multipleChoiceBtn);
document.getElementById("submit").addEventListener("click", submitScore);
document.getElementById("goBack").addEventListener("click", startQuiz); 
document.getElementById("clearScores").addEventListener("click", clearHighScores);// clearHighScores vs clearHighScores() when adding parenthesis, it forces click event to run right away.


// functions:

function startQuiz() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block"; // block is the default.
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

  if(questionIndex < 0 || questionIndex >= questions.length) {
    return;
  }

  var currentQuestion = questions[questionIndex];
  
  document.getElementById("question").innerText = currentQuestion.question; // sets the new question in the html
  for (var i = 1; i < 5; i++) {
    // populates buttons with letter choices.
    document.getElementById("btn" + i).innerText =
      currentQuestion.choices[i - 1];
  }

}

function multipleChoiceBtn(event) {
  var correctChoice = questions[questionIndex].answer;
  var userChoice = event.target.innerText; // grabs the innertext from button

  if (event.target.nodeName === "BUTTON") {
  
    if (userChoice === correctChoice) { // correct choice selected.
      score++;
      document.getElementById("answer").innerText = "Correct Choice!"; 
      document.getElementById("answer").setAttribute("style", "color: green; font-style: italic;");    
      
    } else { // if (userChoice !== correctChoice) wrong choice selected.
      timeLimit -= 10; // penalty
      document.getElementById("answer").innerText ="Wrong Choice!";
      document.getElementById("answer").setAttribute("style", "color: red; font-style: italic;");

    }
    questionIndex++; // updates the index + 1 
    
    if (questionIndex >= questions.length) { // when 3 >= 3
      clearInterval(interval); // stops the timer.
      
      document.getElementById("quizScreen").style.display = "none"; // hides quiz screen
      document.getElementById("endScreen").style.display = "block"; // shows endScreen 
    }
    setTimeout(renderNextQuestion, 1200);  
  }
};

function submitScore() {
  document.getElementById("endScreen").style.display = "none"; 
  document.getElementById("scoreboardScreen").style.display = "block";

  var initials = document.getElementById("initials").value;// get values "initials" from input box.
  var scores = JSON.parse(localStorage.getItem("scores")) || [];
  
  scores.push({ score, initials });

  localStorage.setItem("scores", JSON.stringify(scores));
  // window.location.reload(); // refreshes the page

  getHighScores(scores);

};

function getHighScores(hiScore) {
  initials = hiScore[hiScore.length -1].initials;
  score = hiScore[hiScore.length -1].score;
  console.log("Initials: " + initials + ", score: " + score); // gets the last object in the scores array from 5.

  document.getElementById("endScreen").style.display = "none";
  document.getElementById("scoreboardScreen").style.display = "block";
  document.getElementById("highScore").style.display = "block";

  // maybe insert this in a for loop to show all the scores in the array.
  document.getElementById("highScore").innerHTML = `Initials: ${initials}, Score: ${score}.`; // WHY DOESN'T THIS SHOW?bc display:none, somewhere
  
}

function clearHighScores() {
  document.getElementById("highScore").style.display = "none";
}


/*TODO:  
- list item array for high scores.
  sort array for higher score.
- display final score and rankings list. could posibly highlight your current score.
- missing border unden buttons when selction is chosen.
- bug: 
  + should wait 3 seconds after click to render next question. Currently, it cycle internally afte each btn click.
*/