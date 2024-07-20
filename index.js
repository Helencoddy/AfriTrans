'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 80, 100, 90],
  interestRate: 1,
  pin: 4444,
};


const account5 = {
  owner: 'Kanyinsola Helen Cole ',
  movements: [1000, 4000, -700, 5000, -90, 3000, -1000, 50000],
  interestRate: 1.8,
  pin: 5555,
};


const account6 = {
  owner: 'Utibe Mathew Akpan',
  movements: [300, 500, 17000, -50, -900, 1200, -200, 500],
  interestRate: 1,
  pin: 6666,
};


const account7 = {
  owner: 'Omowunmi Ajoke Cole',
  movements: [1030, 2000, 7000, 1050, 1090, -200, 400],
  interestRate: 1,
  pin: 7777,
};

const account8 = {
  owner: 'Aderonke Agnes Oyeniyi',
  movements: [23000, -1000, -7000, 5000, 900, -10000],
  interestRate: 1,
  pin: 8888,
};


const accounts = [account1, account2, account3, account4, account5, account6, account7, account8 ];

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


//Display Movement
const displayMovement = function(movements){
  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>`
    containerMovements.insertAdjacentHTML ('afterbegin', html);
  })
}



//Display User
const displayUSer = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function(name){
       return name[0];
    }).join('');
  });
};
displayUSer(accounts);


//Calculate Balance
const displayResult = function(movements){
  const balance = movements.reduce(function(accu, mov){
    return accu + mov;
  }, 0);
  labelBalance.textContent = `${balance}€`
};


//calculate summary
const displaySummary = function (acc){
  const income = acc.movements.filter(function(mov){
    return mov > 0;
  }).reduce(function(acc, curr){
    return acc + curr;
  }, 0);
  labelSumIn.textContent = `${income}€`

  const outcome = acc.movements.filter(function(mov){
    return mov < 0;
  }).reduce(function(acc, cur){
    return acc + cur;
  }, 0);
  labelSumOut.textContent = `${outcome}€`

  const interest = movements.filter(function(mov){
    return mov > 0;
  }).map(function(deposit){
    return deposit * acc.interestRate/100;
  }).filter(function(val){
    return val >= 1;
  }).reduce(function(acc, int){
    return acc + int;
  }, 0);

  labelSumInterest.textContent = `${interest}€`
}

// displaySummary(account1.movements);


let currentUser;
btnLogin.addEventListener('click', function(e){
  e.preventDefault()
  currentUser = accounts.find(function(acc){
  return acc.username === inputLoginUsername.value;
  });

  if(currentUser.pin === Number(inputLoginPin.value)){

    //Display User welcome message
    labelWelcome.textContent = `Welcome back, ${currentUser.owner.split(' ')[0]}`;

    //Display User board
    containerApp.style.opacity = 100;

    //Display current user transaction
    displayMovement(currentUser.movements);

    //Display current account balance
    displayResult(currentUser.movements);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    
    inputLoginPin.blur();

  }

});




