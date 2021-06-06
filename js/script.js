'use strict';
const buttonStart = document.getElementById('start');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item');
const outValues = document.querySelectorAll('[class*="-value"]');
const salaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-items .income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-items .expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n); // если число то функция вернет true
}

const HIGH_DAILY_INCOME = 1200;
const AVERAGE_DAILY_INCOME = 600;
// Доход за месяц
let money;

const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
  money = +money;
}
start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000, //сумма которую нужно накопить
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let value;

      do {
        value = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      } while (isNumber(value));
      const itemIncome = value;

      do {
        value = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      } while (!isNumber(value));
      const cashIncome = +value;
      appData.income[itemIncome] = cashIncome;
    }
    // дополнительные расходы через запятую
    let addExpenses;

      do {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Игры, Проездной, Кредит');
      } while (isNumber(addExpenses));

    appData.addExpenses = addExpenses.toLowerCase().split(',').map(item => item.trim());

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let amount;

      do {
        amount = prompt('Введите обязательную статью расходов?');
      } while (isNumber(amount));
      let key = amount;

      do {
        amount = prompt('Во сколько это обойдется?');

      } while (!isNumber(amount));

      appData.expenses[key] = +amount;
    }
  },
// Вычисляем сумма всех обязательных расходов за месяц
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let item in appData.expenses) {
      appData.expensesMonth += appData.expenses[item];
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    //Вычисляем накопления за месяц (Доходы минус расходы)
    appData.budgetMonth = money - appData.expensesMonth;
    // дневной бюджет
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    appData.getBudget();
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    if (appData.period > 0) return (`Цель будет достигнута ${appData.period} месяцев`);
    if (appData.period < 0) return (`Цель не будет достигнута`);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= HIGH_DAILY_INCOME) return ('У вас высокий уровень дохода');
    if (appData.budgetDay >= AVERAGE_DAILY_INCOME && appData.budgetDay < HIGH_DAILY_INCOME) return ('У вас средний уровень дохода');
    if (appData.budgetDay < AVERAGE_DAILY_INCOME && appData.budgetDay >= 0) return ('К сожалению у вас уровень дохода ниже среднего');
    if (appData.budgetDay < 0) return ('Что-то пошло не так!');
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      let value;

      do {
        value = prompt('Какой годовой процент', '10');
      } while (!isNumber(value));
      appData.percentDeposit = +value;

      do {
        value =prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(value));
      appData.moneyDeposit = +value;
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
console.log(appData.addExpenses);
console.log(appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(`Наша программа включает в себя данные:`);
for (let key in appData) {  
  console.log(`Ключ: ${key} Значение: ${appData[key]}`);
}
appData.getInfoDeposit();
console.log(appData.calcSavedMoney(), appData.percentDeposit, appData.moneyDeposit);

const outAddExpenses = () => {
  let str = '';
  for (let item of appData.addExpenses) {
    str += `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}, `;
  }
  console.log(str);
}
outAddExpenses();