'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ajay Kathrotiya',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Rakul Prit',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Rohit Sharma',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Mrunal Thakor',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'makodo marya',
  movements: [430, 1000, 700, -345, 90, -123, 90],
  interestRate: 1.9,
  pin: 1234,
};

const account6 = {
  owner: 'Suhasini Gupta',
  movements: [10, 400, -65, 2, -100, 467, 18],
  interestRate: 1.8, // %
  pin: 6666,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// USE OF FOR EACH METHOD ::
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = ''; same

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__value">${Math.abs(mov)} €</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplaySummery = function (account) {
  labelSumIn.textContent = `${account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)} €`;
  labelSumOut.textContent = `${Math.abs(
    account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  )} €`;
  labelSumInterest.textContent = `${Math.round(
    account.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + (mov * account.interestRate) / 100, 0)
  )} €`;
};

// use of reduce method :

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// map method ::
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurtoUsd = 1.1;

// const movementUsd = movements.map(mov => Math.round(eurtoUsd*mov));
// console.log(movements);
// console.log(movementUsd);

//USE OF MAP METHOD :::
const creatUserName = function (accounts) {
  accounts.forEach(
    account =>
      (account.username = account.owner
        .split(' ')
        .map(name => name[0])
        .join('')
        .toLowerCase())
  );
};

creatUserName(accounts);

// update UI ":"

const updateUI = function (acc) {
  // Display balance
  calcPrintBalance(acc);
  // Display Movements :
  displayMovements(acc.movements);
  // Dispaly Summery ;
  calDisplaySummery(acc);
};

// Event handler ::

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting ::
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI : Welcome messages :

    containerApp.style.opacity = 100;
    // Display Welcome message:
    labelWelcome.textContent = `Welcome back ! ${
      currentAccount.owner.split(' ')[0]
    }`;

    // clrear username and pin field:

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display balance

    // Display Movements :

    // Dispaly Summery ;

    updateUI(currentAccount);
  }
});

// transfer amount ::

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    reciverAcc &&
    amount <= currentAccount.balance &&
    currentAccount.username !== reciverAcc?.username
  ) {
    reciverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    inputLoanAmount.value = '';
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome = 'Log in to get started';
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

// Sort method implimentation ::

let sorted = false;
btnSort.addEventListener('click', function (e) {
  displayMovements(currentAccount.movements, !sorted);
  sorted  = !sorted;
});
// FILTER METHOD ::

// const deposit = account1.movements.filter(function(mov){ return mov>0;});
// const withdrawal = account1.movements.filter(function(mov){ return mov<0;});
// console.log(deposit);
// console.log(withdrawal);

//const movements =  [200, 450, -400, 3000, -650, -130, 70, 1300];

// // REDUCE METHOD ::

// // accumulator => snowball, or initital sum =0 :)

// const balance = movements.reduce(function(acc,mov,i,ar){return acc+mov;},0);
// console.log(balance);

// Find METHOD : return first eleent based on condition ::

// const firstWithdrawal = movements.find(mov=>mov<0);
// console.log(firstWithdrawal);

// many other method :> some,every,includes,flat,flatmap ::

// const ar = [1,2,[3,4,5],6,7,[8,9,10]];
// console.log(ar.flat());
