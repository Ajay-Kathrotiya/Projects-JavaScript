'use strict';

// selecting elements

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
let score1 = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');

//  starting condition ::


let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let currentScore,activePlayer,scores,playing;

let init = function () {
 currentScore = 0;
 activePlayer = 0;
 scores = [0, 0];
 playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

// rolling dice functionality ::
btnRoll.addEventListener('click', function () {
  // generating a random number 1-6 :
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    // display dice :
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for roll one : if true, then switch to next player ::
    if (dice !== 1) {
      // add to score ::
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player ::
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. add current score to the active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. chck if the score >= 100 , if so then that player win the gane and finish game
  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
  // 3. switch the next player :
  else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
