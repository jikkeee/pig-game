'use strict';

let roll = document.querySelector(".btn--roll")
let hold = document.querySelector(".btn--hold");
let dice = document.querySelector(".dice");
let score = 0;
let currentScore = 0;
let playerOne = document.querySelector(".player--0");
let playerTwo = document.querySelector(".player--1");
let playerOneScore = document.getElementById("score--0");
let playerTwoScore = document.getElementById("score--1");
let playerOneTotal = parseInt(playerOneScore.textContent, 10);
let playerTwoTotal = parseInt(playerTwoScore.textContent, 10);

playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;
dice.classList.add("hidden");

function rollDice() {

    let randomNumber = Math.floor(Math.random() * 6) + 1;
    dice.setAttribute('src', `dice-${randomNumber}.png`);
    dice.classList.remove("hidden");

    currentScore += randomNumber;

    if (playerOne.classList.contains("player--active")) {
        document.getElementById("current--0").textContent = currentScore;
    } else {
        document.getElementById("current--1").textContent = currentScore;
    }

    if (randomNumber === 1) {
        if ((playerOne.classList.contains("player--active"))) {
            currentScore = 0;
            document.getElementById("current--0").textContent = currentScore;
            playerOne.classList.remove("player--active");
            playerTwo.classList.add("player--active");
        } else {
            currentScore = 0;
            document.getElementById("current--1").textContent = currentScore;
            playerOne.classList.add("player--active");
            playerTwo.classList.remove("player--active");
        }
    }


}

roll.addEventListener('click', rollDice);

function holdEvent() {
    if (playerOne.classList.contains("player--active")) {

        playerOneTotal += currentScore;
        playerOneScore.textContent = playerOneTotal;
        currentScore = 0;
        document.getElementById("current--0").textContent = currentScore;
        playerOne.classList.remove("player--active");
        playerTwo.classList.add("player--active");
    } else {

        playerTwoTotal += currentScore;
        playerTwoScore.textContent = playerTwoTotal;
        currentScore = 0;
        document.getElementById("current--1").textContent = currentScore;
        playerOne.classList.add("player--active");
        playerTwo.classList.remove("player--active");
    }

    if ((playerOneTotal >= 100) && (playerTwoTotal <= 100)) {
        document.getElementById("name--0").textContent = "Winner!";
        playerOne.classList.add("player--winner");
        hold.removeEventListener('click', holdEvent);
        roll.removeEventListener('click', rollDice);
    } else if ((playerOneTotal <= 100) && (playerTwoTotal >= 100)) {
        document.getElementById("name--1").textContent = "Winner!";
        playerTwo.classList.add("player--winner");
        hold.removeEventListener('click', holdEvent);
        roll.removeEventListener('click', rollDice);
    }

}

hold.addEventListener('click', holdEvent);

document.querySelector(".btn--new").addEventListener('click', () => {
    currentScore = 0;
    playerOneTotal = 0;
    playerTwoTotal = 0;
    document.getElementById("name--1").textContent = "Player 2";
    document.getElementById("name--0").textContent = "Player 1";
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    playerOneScore.textContent = playerOneTotal;
    playerTwoScore.textContent = playerTwoTotal;
    document.getElementById("current--0").textContent = currentScore;
    document.getElementById("current--1").textContent = currentScore;
    playerOne.classList.add("player--active");
    playerTwo.classList.remove("player--active");
    dice.classList.add("hidden");
    roll.addEventListener('click', rollDice);
    hold.addEventListener('click', holdEvent);
});
