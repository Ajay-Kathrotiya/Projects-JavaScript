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

  movementsDate: [
    '2010-04-24T06:35:37.014Z',
    '2011-04-23T06:38:37.014Z',
    '2012-02-25T06:50:37.014Z',
    '2013-03-20T06:01:37.014Z',
    '2014-04-24T06:34:37.014Z',
    '2023-04-20T06:20:37.014Z',
    '2023-04-23T06:15:37.014Z',
    '2023-04-24T06:20:37.014Z',
  ],
};

const account2 = {
  owner: 'Rakul Prit',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDate: [
    '2015-01-01T06:35:37.014Z',
    '2016-01-23T06:38:37.014Z',
    '2017-02-12T06:50:37.014Z',
    '2018-03-13T06:01:37.014Z',
    '2019-04-18T06:34:37.014Z',
    '2020-05-06T06:20:37.014Z',
    '2023-01-23T06:15:37.014Z',
    '2023-02-24T06:20:37.014Z',
  ],
};

const account3 = {
  owner: 'Rohit Sharma',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDate: [
    '2015-01-24T06:35:37.014Z',
    '2016-02-24T06:38:37.014Z',
    '2017-02-25T06:50:37.014Z',
    '2018-03-20T06:01:37.014Z',
    '2019-04-24T06:34:37.014Z',
    '2020-05-28T06:20:37.014Z',
    '2021-01-01T06:15:37.014Z',
    '2022-02-22T06:20:37.014Z',
  ],
};

const account4 = {
  owner: 'Mrunal Thakor',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDate: [
    '2020-01-24T06:35:37.014Z',
    '2021-01-24T06:38:37.014Z',
    '2022-02-24T06:50:37.014Z',
    '2023-03-24T06:01:37.014Z',
    '2023-04-24T06:34:37.014Z',
  ],
};

const account5 = {
  owner: 'makodo marya',
  movements: [430, 1000, 700, -345, 90, -123, 90],
  interestRate: 1.9,
  pin: 1234,
  movementsDate: [
    '2018-01-24T06:35:37.014Z',
    '2019-01-24T06:38:37.014Z',
    '2020-02-24T06:50:37.014Z',
    '2021-03-24T06:01:37.014Z',
    '2022-04-24T06:34:37.014Z',
    '2022-05-24T06:20:37.014Z',
  ],
};

const account6 = {
  owner: 'Suhasini Gupta',
  movements: [10, 400, -65, 2, -100, 467, 18],
  interestRate: 1.8, // %
  pin: 6666,
  movementsDate: [
    '2017-01-24T06:35:37.014Z',
    '2018-01-24T06:38:37.014Z',
    '2019-02-24T06:50:37.014Z',
    '2020-03-24T06:01:37.014Z',
    '2021-04-24T06:34:37.014Z',
    '2022-05-24T06:20:37.014Z',
    '2023-04-24T06:15:37.014Z',
  ],
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

// Date formating for movements ::

const formateMovementsDate = function (date) {
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = String(date.getFullYear());

  const calcDayPassed = function (date1, date2) {
    return Math.round(Math.abs((date1 - date2) / (1000 * 24 * 60 * 60)));
  };

  const dayPassed = calcDayPassed(new Date(), date);

  if (dayPassed === 0) return 'Today';
  if (dayPassed === 1) return 'yesterday';
  if (dayPassed <= 7) return `${dayPassed} days ago`;
  else {
    return `${day}-${month}-${year}`;
  }
};

// USE OF FOR EACH METHOD ::
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = ''; same

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDate[i]);
    const displayDate = formateMovementsDate(date);

    const html = `
            <div class="movements__row">
            
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
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
  displayMovements(acc);
  // Dispaly Summery ;
  calDisplaySummery(acc);
};

// Event handler ::

let currentAccount,timer;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting ::
  e.preventDefault();

  // CURRENT LOGIN :

  // CURRENT DATE :

  const now = new Date();
  const day = String(now.getDate()).padStart(2, 0);
  const month = String(now.getMonth() + 1).padStart(2, 0);
  const year = String(now.getFullYear());
  const hour = String(now.getHours()).padStart(2, 0);
  const min = String(now.getMinutes()).padStart(2, 0);
  const sec = String(now.getSeconds()).padStart(2, 0);

  labelDate.textContent = `${day}-${month}-${year} ${hour}:${min}:${sec}`;

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
    
      // start logout timer
       if (timer){
        clearInterval(timer);
       }
        timer = startLogOutTimer();
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
    reciverAcc.movementsDate.push(new Date().toISOString());
    reciverAcc.movements.push(amount);
    currentAccount.movementsDate.push(new Date().toISOString());
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);

    // reset timer:
    
    clearInterval(timer);
    timer = startLogOutTimer();

  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  setTimeout(function () {
    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= 0.1 * amount)
    ) {
      currentAccount.movements.push(amount);
      inputLoanAmount.value = '';
      currentAccount.movementsDate.push(new Date().toISOString());
      updateUI(currentAccount);
     
      // reset timer:
    
      clearInterval(timer);
       timer = startLogOutTimer();

    }
  }, 3000);

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


// log out timer ::

const startLogOutTimer = function(){

   const tick = function() {
    const min = String(Math.trunc(time/60)).padStart(2,'0');
    const sec = String(time%60).padStart(2,'0');   
    // print time in min and sec 
    labelTimer.textContent = `${min}:${sec}`;
    
  
     // when time =0 , stop the fun and log out the user:
  if (time==0){
     clearInterval(timer);
     containerApp.style.opacity = 0;
     // Display Welcome message:
     labelWelcome.textContent = 'Log in to get started';

  }
  // dec tiem and stop the func after 0 sec and log out the user :
  time--;

}
  // set time to 5 min
  let time = 300;
  // call fun setinterval every second:
  tick()
  const timer = setInterval(tick, 1000);
  return timer
}


// Sort method implimentation ::

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

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
