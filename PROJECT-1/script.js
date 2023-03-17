'use strict';

let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input

  if (!guess) {
    document.querySelector('.message').textContent = '😈 No Number';
  }

  // when player wins :
  else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    document.querySelector('.message').textContent = '🎉 Correct Number';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '50rem';
    document.querySelector('.number').textContent = 'You Won!';
    document.querySelector('h1').textContent = '🎇 Congratulations 🎇';
    document.querySelector('h1').style.color = '#02302E ';
    document.querySelector('.number').style.color = '#EFEF10';
    document.querySelector('.number').style.backgroundColor = '#030F54';
    document.querySelector('h1').style.fontSize = '4.5rem';
    document.querySelector('h1').style.top = '40%';
  }

  // when wrong number entered..
  else {
    score--;
    if (score > 0) {
      if (guess > secretNumber) {
        document.querySelector('.message').textContent = '📈 Too High...!';
      } else {
        document.querySelector('.message').textContent = '📉 Too Low...!';
      }
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '😜 You Lost The Game !';
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('.message').textContent = 'Start guessing...';
  score = 20;
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.color = '#eee';
  document.querySelector('.number').style.backgroundColor = '#333';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('h1').textContent = 'Guess My Number!';
  document.querySelector('h1').style.color = '#eee';
  document.querySelector('h1').style.fontSize = '4rem';
  document.querySelector('h1').style.top = '50%';
});
