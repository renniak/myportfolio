"use strict";
// Variables
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const output = document.querySelector("#output");
const playAgain = document.querySelector("#playAgain");
const scoreboard = document.querySelector("#scoreboard");
let computerSelection = "";
let playerSelection = "";
let round = 5;
let playerScore = 0;
let computerScore = 0;

// Functions
// Player chooses
function playRock() {
  playRound("rock");
}

function playPaper() {
  playRound("paper");
}

function playScissors() {
  playRound("scissors");
}
// Computer Chooses
function computerPlay() {
  let play = Math.floor(Math.random() * (3 - 0)) + 0;
  if (play == 0) {
    return "rock";
  } else if (play == 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function playRound(playerSelection) {
  if (round > 0) {
    computerSelection = computerPlay();
    if (playerSelection == computerSelection) {
      output.innerHTML = `<h2>You both chose <span class="result">${playerSelection}</span>, it's a Tie!</h2>`;
      computerScore++;
      playerScore++;
      round--;
    } else if (
      (playerSelection == "rock" && computerSelection == "paper") ||
      (playerSelection == "paper" && computerSelection == "scissors") ||
      (playerSelection == "scissors" && computerSelection == "rock")
    ) {
      output.innerHTML = `<h2>You chose <span class="result">${playerSelection}</span> and the computer had <span class="result">${computerSelection}</span>, You Lose!</h2>`;
      round--;
      computerScore++;
    } else {
      output.innerHTML = `<h2>You chose <span class="result">${playerSelection}</span> and the computer had <span class="result">${computerSelection}</span>, You Win!</h2>`;
      round--;
      playerScore++;
    }
    updateScore();
  } else {
    output.innerHTML = `
	<h2 class="result">Game Over</h2>`;
    if (playerScore > computerScore) {
      output.innerHTML += `<h2>Congrats! You beat the computer</h2>`;
    } else if (playerScore < computerScore) {
      output.innerHTML += `<h2>Too bad! You got your ass kicked</h2>`;
    } else {
      output.innerHTML += `<h2>Well, nobody won...</h2>`;
    }
    playAgain.style.display = "block";
  }
}

function updateScore() {
  scoreboard.innerHTML = `
    <span class="score">Computer - <span class="score-number">${computerScore}</span>   You - <span class="score-number">${playerScore}</span>
  `;
}

function restart() {
  playAgain.style.display = "none";
  output.innerHTML = "";
  round = 5;
  playerScore = 0;
  computerScore = 0;
  updateScore();
}

// Event Listeners
rock.addEventListener("click", playRock);
paper.addEventListener("click", playPaper);
scissors.addEventListener("click", playScissors);
playAgain.addEventListener("click", restart);
