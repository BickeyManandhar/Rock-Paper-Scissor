let score = {
  win: 0,
  lost: 0,
  draw: 0,
  totalGamesPlayed: 0,
  displayScore: function () {
    return `Win:${this.win} , Lost:${this.lost}, Draw: ${this.draw}, Total Games Played:${this.totalGamesPlayed}`
  }
}
function clearScore() {
  localStorage.removeItem('score'); //clearing score in local storage
  //initiallizing variable to 0
  score.win = 0;
  score.lost = 0;
  score.draw = 0;
  score.totalGamesPlayed = 0;
  // Reset the display on the webpage too
  document.querySelector('#draw').innerText = `Draw: ${score.draw}`;
  document.querySelector('#win').innerText = `Win: ${score.win}`;
  document.querySelector('#lose').innerText = `Lose: ${score.lost}`;
  document.querySelector('#totalGamesPlayed').innerText = score.displayScore();
}

function buttonClicked(userInput) {

  let randNumber = Math.floor(Math.random() * 3); // Gives random number from 0-3 then floor makes it 0, 1, or 2
  let compChoice = '';
  if (randNumber == 0) {
    compChoice = 'Rock';
  } else if (randNumber == 1) {
    compChoice = 'Paper';
  } else {
    compChoice = 'Scissor';
  }

  if (compChoice == userInput) {
    score.draw++;
    score.totalGamesPlayed++;
    document.querySelector('#your-choice').innerText = "User Choose: " + userInput;
    document.querySelector('#comp-choice').innerText = "Computer Choose: " + compChoice;
    document.querySelector('#result').innerText = "Result: Draw";
    //  document.querySelector('#draw').innerText = `Draw: ${score.draw}`;


    const drawAudio = document.getElementById("draw-audio");
    drawAudio.play();
  } else if (
    (userInput === 'Rock' && compChoice === 'Scissor') ||
    (userInput === 'Paper' && compChoice === 'Rock') ||
    (userInput === 'Scissor' && compChoice === 'Paper')
  ) {
    score.win++;
    score.totalGamesPlayed++;
    document.querySelector('#your-choice').innerText = "User Choose: " + userInput;
    document.querySelector('#comp-choice').innerText = "Computer Choose: " + compChoice;
    document.querySelector('#result').innerText = "Result: You Win";
    // document.querySelector('#win').innerText = `Win: ${score.win}`;


    // Play the winning sound
    const winAudio = document.getElementById("win-audio");
    winAudio.play();

    // Stop the audio after 3 seconds
    setTimeout(function () {
      winAudio.pause();
      winAudio.currentTime = 0; // Reset the audio to the beginning
    }, 3000);

  } else {
    score.lost++;
    score.totalGamesPlayed++;
    document.querySelector('#your-choice').innerText = "User Choose: " + userInput;
    document.querySelector('#comp-choice').innerText = "Computer Choose: " + compChoice;
    document.querySelector('#result').innerText = "Result: You Lose";
    // document.querySelector('#lose').innerText = `Lose: ${score.lost}`;
    // Play the lose sound
    const loseAudio = document.getElementById("lose-audio");
    loseAudio.play();
  }
  // Calculate the display score before saving to local storage since it functions cannot be save in local storage
  const displayScore = score.displayScore();
  document.querySelector('#draw').innerText = `Draw: ${score.draw}`;
  document.querySelector('#win').innerText = `Win: ${score.win}`;
  document.querySelector('#lose').innerText = `Lose: ${score.lost}`;
  document.querySelector('#totalGamesPlayed').innerText = score.displayScore();
  localStorage.setItem('score', JSON.stringify({ ...score, displayScore })); //{ ...score, displayScore }: We use the spread operator to create a new object that includes all the properties from the score object, and we add a new property called displayScore. The displayScore property will contain the string generated by the score.displayScore() function. we used {} to create new object
}


function getScoreFromLocalStorage() {
  let localScore = localStorage.getItem('score');
  if (localScore !== null) {
    const savedScore = JSON.parse(localScore);
    score.win = savedScore.win;
    score.lost = savedScore.lost;
    score.draw = savedScore.draw;
    score.totalGamesPlayed = savedScore.totalGamesPlayed;
  }
}
getScoreFromLocalStorage();