'use strict';
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
  mission: 50000, //сумма которую нужно накопить
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    // дополнительные расходы через запятую
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'Игры, Проездной, Кредит');

    appData.addExpenses = addExpenses.toLowerCase().split(',').map(item => item.trim());

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      let key = prompt('Введите обязательную статью расходов?');
      let amount;
      do {
        amount = prompt('Во сколько это обойдется?');

      } while (!isNumber(amount));

      appData.expenses[key] = +amount;
    }
  },
// Вычисляем сумма всех обязательных расходов за месяц
  getExpensesMonth: function () {
    Object.values(appData.expenses).forEach(item => {
      appData.expensesMonth += item;
    });
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
};

appData.asking();

console.log(appData.getExpensesMonth());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(`Наша программа включает в себя данные:`);
for (let key in appData) {  
  console.log(`Ключ: ${key} Значение: ${appData[key]}`);
}