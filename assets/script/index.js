'use strict';

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 
'keyboard', 'window'];

const input = document.getElementById("input");
const startButton = document.getElementById("start-button");
const pointsElement = document.getElementById("points");
const timeLeftElement = document.getElementById("time-left");
const promptText = document.getElementById("prompt");
const backgroundMusic = document.getElementById("background-music");

let wordsLeft = [];
let points = 0;
let timeLeft = 99;
let timerIntervalId;

function getRandomWord() {
  if (wordsLeft.length === 0) {
    wordsLeft = [...words];
  }
  const randomIndex = Math.floor(Math.random() * wordsLeft.length);
  const word = wordsLeft[randomIndex];
  return word;
}

function calculateTypingSpeed(start, end) {
  const typedText = input.value.trim();
  const typedWords = typedText.split(" ");
  const timeDiff = (end - start) / 1000; // Time in seconds
  const typingSpeed = Math.round(typedWords.length / timeDiff * 60);
  return typingSpeed;
}



function displayTypingResult(typingSpeed) {
  clearInterval(timerIntervalId);
  input.disabled = true;
  startButton.disabled = false;
  backgroundMusic.pause();
  wordsLeft = [];
  const resultSection = document.querySelector('.result-section');
  const typingSpeedElement = resultSection.querySelector('.typing-speed');
  const scoreElement = resultSection.querySelector('.score');
  typingSpeedElement.textContent = typingSpeed;
  scoreElement.textContent = points;
  resultSection.classList.add('show');
  input.value = "";
  points = 0;
  timeLeft = 99;
  pointsElement.innerHTML = 0;
  timeLeftElement.innerHTML = 99;
}

function startGame() {
  backgroundMusic.play();
  input.disabled = false;
  input.value = "";
  input.focus();
  startButton.disabled = true;
  wordsLeft = [...words];
  promptText.innerHTML = getRandomWord();
  input.addEventListener("keyup", handleKeyup); // Add the keyup event listener when the game starts
  const startTime = new Date();
  timerIntervalId = setInterval(() => {
    timeLeft--;
    timeLeftElement.innerHTML = timeLeft;
    if (timeLeft === 0 || points === words.length) {
      clearInterval(timerIntervalId);
      const endTime = new Date();
      const typingSpeed = calculateTypingSpeed(startTime, endTime);
      displayTypingResult(typingSpeed);
    }
  }, 1000);
}

function handleKeyup(event) {
  if (event.keyCode === 13) {
    const typedWord = input.value.trim();
    const promptWord = promptText.innerHTML;
    if (typedWord.toLowerCase() === promptWord.toLowerCase()) {
      points++;
      pointsElement.innerHTML = points;
      promptText.innerHTML = getRandomWord();
      input.value = "";
    }
  }
}

// Listen for the "Start" button click event to start the game
startButton.addEventListener("click", startGame);

// Define the Score class
class Score {
  #date;
  #hits;
  #percentage;
  
  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = percentage;
  }
  
  get date() {
    return this.#date;
  }
  
  get hits() {
    return this.#hits;
  }
  
  get percentage() {
    return this.#percentage;
  }
}

const correctSound = document.getElementById("correct-sound");
correctSound.currentTime = 0;
correctSound.play();

promptText.classList.add("correct");
setTimeout(() => {
  promptText.classList.remove("correct");
}, 500);

function handleKeyup(event) {
  if (event.keyCode === 13) {
    const typedWord = input.value.trim();
    const promptWord = promptText.innerHTML;
    if (typedWord.toLowerCase() === promptWord.toLowerCase()) {
      points++;
      pointsElement.innerHTML = points;
      promptText.innerHTML = getRandomWord();
      input.value = "";
      const correctSound = document.getElementById("correct-sound");
      correctSound.currentTime = 0;
      correctSound.play();
      promptText.classList.add("correct");
      setTimeout(() => {
        promptText.classList.remove("correct");
      }, 500);
    }
  }
}

function hideButton() {
  var startButton = document.getElementById("start-button");
  startButton.style.display = "none"; // hide the button
  setTimeout(function() {
    startButton.style.display = "block"; // show the button again after 99 seconds
  }, 99000); // 99 seconds * 1000 (milliseconds per second)
}

var button = document.getElementById("start-button");
button.addEventListener("click", hideButton);


// A function that resets all the variables to their initial values and hides the result section
/*function resetGame() {
  resultSection.classList.remove('show');
  textContent.remove('typingSpeed');
  textContent.remove('points') 
}

startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start') {
    resetGame();
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    timerIntervalId = setInterval(() => {
      timeLeft--;
      timeLeftElement.textContent = timeLeft;
      if (timeLeft === 0) {
        const typingSpeed = calculateTypingSpeed(startTime, new Date());
        displayTypingResult(typingSpeed);
      }
    }, 1000);
    const promptWord = getRandomWord();
    promptText.textContent = promptWord;
    input.focus();
  } else {
    resetGame();
  }
});*/
