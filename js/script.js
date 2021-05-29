'use strict'
const HIGH_DAILY_INCOME = 1200;
const AVERAGE_DAILY_INCOME = 600;
// Доход за месяц
const money = +prompt('Ваш месячный доход?', '45000');
// дополнительный доход
const income = 'фриланс';
// дополнительные расходы через запятую
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
  'Игры, Проездной, Кредит');

const deposit = confirm('Есть ли у вас депозит в банке?');
//сумма которую нужно накопить
const mission = 500000;
//Обязательные статьи расходов
const expenses1 = prompt('Введите обязательную статью расходов?', 'Квартплата');
const amount1 = +prompt('Во сколько это обойдется?', '10000');
const expenses2 = prompt('Введите обязательную статью расходов?', 'Питание');
const amount2 = +prompt('Во сколько это обойдется?', '15000');
const arrExpenses = addExpenses.toLowerCase().split(',');

// сумма всех обязательных расходов за месяц
const getExpensesMonth = () => {
  return amount1 + amount2;
}

// Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (sumAmount) => {
  return money - sumAmount;
}

// Вычисляем бюджет на месяц
const accumulatedMonth = getAccumulatedMonth(getExpensesMonth());

//за сколько месяцев будет достигнута цель
const getTargetMonth = () => {
  return Math.ceil(mission / accumulatedMonth);
}

// дневной бюджет
const budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = () => {
  if (budgetDay >= HIGH_DAILY_INCOME) return ('У вас высокий уровень дохода');
  if (budgetDay >= AVERAGE_DAILY_INCOME && budgetDay < HIGH_DAILY_INCOME) return ('У вас средний уровень дохода');
  if (budgetDay < AVERAGE_DAILY_INCOME && budgetDay >= 0) return ('К сожалению у вас уровень дохода ниже среднего');
  if (budgetDay < 0) return ('Что то пошло не так');
}

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(`Расходы за месяц ${getExpensesMonth()}`);
console.log(arrExpenses.map(item => item.trim()));
console.log(`Cрок достижения цели ${getTargetMonth()} месяцев`);
console.log(`Бюджет на день ${budgetDay}`);
console.log(getStatusIncome());