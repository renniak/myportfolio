"use strict";
// Init Variables
let questionIndex = 0;
let points = 0;
let displayChoices = [];
const questions = [];
const correctAns = [];
const incorrectAns = [];
const questionParent = document.querySelector("#question");
const optionList = document.querySelector("#optionList");
const url = "https://opentdb.com/api.php?amount=50&category=15&type=boolean";
const submitBtn = document.querySelector("#submitBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const questionAmount = 19;

// Fetch Data from Trivia API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Get questions
    data.results.map(trivia => questions.push(trivia.question));
    // Get correct option
    data.results.map(trivia => correctAns.push(trivia.correct_answer));
    // Get incorrect options
    data.results.map(trivia => incorrectAns.push(...trivia.incorrect_answers));
    setQuestion();
    setChoices();

    // Create DOM Elements
    function setQuestion() {
      questionParent.innerHTML = `<h2>${questions[questionIndex]}</h2>`;
      return questionParent.innerHTML;
    }
    function setChoices() {
      return (optionList.innerHTML = `
      <li class="item">
      <input value="True" name="option" type="radio">
      <p>True</p>
      
      <li class="item">
      <input value="False" name="option" type="radio">
      <p>False</p>`);
    }
    // Check Answer
    function checkAns() {
      let choice = document.querySelector("input[name=option]:checked").value;
      if (choice === correctAns[questionIndex]) {
        questionIndex++;
        points++;
        setQuestion();
      } else {
        questionIndex++;
        points <= 0 ? (points = 0) : points--;
        setQuestion();
      }
      // Check game Status
      gameStatus();
    }

    // Check Game Status
    function gameStatus() {
      if (questionIndex > questionAmount) {
        questionParent.innerHTML = "<h2>Game over</h2>";
        optionList.innerHTML = `<h3 class="score">Your Score is ${points}</h3>`;
        submitBtn.style.display = "none";
        playAgainBtn.style.display = "block";
      }
    }

    // Restart Game

    function restartGame() {
      window.location.reload(true);
    }

    // Event Listeners
    submitBtn.addEventListener("click", checkAns);
    playAgainBtn.addEventListener("click", restartGame);
  })

  // Catch possible errors
  .catch(error => console.error(error));
