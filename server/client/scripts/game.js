import { Snake } from "./classes/snake.js";
import { Food } from "./classes/food.js";
import * as utils from "./utils.js";

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


const trainImage = 'train.png';
const trainCartImage = 'car.png';
const beerImage = "beer.png";
const heightWidth = 20;
const food = new Food(heightWidth,beerImage);
const snake = new Snake(5,5,heightWidth,trainImage,trainCartImage);
let setIntervalId;
let score = 0;

const urlParams = new URLSearchParams(window.location.search);
const accessTokenUrl = urlParams.get('access_token');
const playerNameUrl = urlParams.get('playerName');

	localStorage.setItem('access_token', accessTokenUrl);
	localStorage.setItem('playerName', playerNameUrl);

if ((accessTokenUrl === null || playerNameUrl === null) && (localStorage.getItem('access_token') === null || localStorage.getItem('playerName') === null)) {
	console.log("Redirecting");
	window.location.href = '/';
}

// Getting high score from API
let highScore = 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const playerName = localStorage.getItem('playerName');

window.onload = (event) => {
  const response = utils.getHighscore(playerName);
  response.then((data) => {
    if (data !== "success") {
      highScore = data.player.highscore;	
      highScoreElement.innerText = `High Score: ${highScore}`;

      food.updateFoodPosition();
      setIntervalId = setInterval(initGame, 150);
      document.addEventListener("keydown", changeDirection);
    }
  });
};


const sendScoreToAPI = () => {
	console.log("Running post request");
	let currentPlayerScore = score;
	let playerName = localStorage.getItem("playerName");

	const ScoreResult = {
		username: playerName,
		score: parseInt(currentPlayerScore),
	};

  const response = utils.getHighscore(playerName);
}

// Gameplay
const handleGameOver = () => {
		clearInterval(setIntervalId);
    sendScoreToAPI()
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    snake.changeDirection(e);
}

const initGame = () => {
    
    let html = food.getHtml();

    if(snake.getSnakePosition()[0] == food.getFoodPosition()[0] && snake.getSnakePosition()[1] == food.getFoodPosition()[1]) {
        console.log("hit")
        food.updateFoodPosition();
        snake.addFood(food.getFoodPosition()[1],food.getFoodPosition()[0]);
        score++; 
        highScore = score >= highScore ? score : highScore;
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    snake.updateSnake();

    if (snake.checkCollsion()){
      return handleGameOver();
    }

    html += snake.getHtml();

    playBoard.innerHTML = html;
}


