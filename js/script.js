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
}
start();

// дополнительный доход
const income = 'фриланс';
// дополнительные расходы через запятую
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
  'Игры, Проездной, Кредит');

const deposit = confirm('Есть ли у вас депозит в банке?');
//сумма которую нужно накопить
const mission = 500000;
//Обязательные статьи расходов
const expenses = []
const arrExpenses = addExpenses.toLowerCase().split(',');

// сумма всех обязательных расходов за месяц
const getExpensesMonth = () => {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    let amount;
    do {
      amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    sum += +amount;
  }
  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

// Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (sumAmount) => {
  return money - sumAmount;
}

// Вычисляем бюджет на месяц
const accumulatedMonth = getAccumulatedMonth(expensesAmount);

//за сколько месяцев будет достигнута цель
const getTargetMonth = () => {
  const period = Math.ceil(mission / accumulatedMonth);
  if (period > 0) return (`Цель будет достигнута ${period} месяцев`);
  if (period < 0) return (`Цель не будет достигнута`);

}

// дневной бюджет
const budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = () => {
  if (budgetDay >= HIGH_DAILY_INCOME) return ('У вас высокий уровень дохода');
  if (budgetDay >= AVERAGE_DAILY_INCOME && budgetDay < HIGH_DAILY_INCOME) return ('У вас средний уровень дохода');
  if (budgetDay < AVERAGE_DAILY_INCOME && budgetDay >= 0) return ('К сожалению у вас уровень дохода ниже среднего');
  if (budgetDay < 0) return ('Что-то пошло не так!');
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(`Расходы за месяц ${expensesAmount}`);
console.log(arrExpenses.map(item => item.trim()));
console.log(getTargetMonth());
console.log(`Бюджет на день ${budgetDay}`);
console.log(getStatusIncome());