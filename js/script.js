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

// Вычисляем бюджет на месяц
const budgetMonth = money - (amount1 + amount2);

//за сколько месяцев будет достигнута цель
const period = Math.ceil(mission / budgetMonth);

// дневной бюджет
const budgetDay = Math.floor(budgetMonth / 30);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(`Бюджет на день ${budgetDay}`);
console.log(`Бюджет на месяц: ${budgetMonth}`);

if (budgetDay >= HIGH_DAILY_INCOME) console.log('У вас высокий уровень дохода');
if (budgetDay >= AVERAGE_DAILY_INCOME && budgetDay < HIGH_DAILY_INCOME) console.log('У вас средний уровень дохода');
if (budgetDay < AVERAGE_DAILY_INCOME && budgetDay >= 0) console.log('К сожалению у вас уровень дохода ниже среднего');
if (budgetDay < 0) console.log('Что то пошло не так');

const arrExpenses = addExpenses.toLowerCase().split(',');
console.log(arrExpenses.map(item => item.trim()));