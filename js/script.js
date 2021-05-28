'use strict'
// Доход за месяц
const money = +prompt('Ваш месячный доход?', '45000');
// дополнительный доход
const income = 'фриланс';
// дополнительные расходы через запятую
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
  'игры, проездной, кредит');

const deposit = confirm('Есть ли у вас депозит в банке?');
//сумма которую нужно накопить
const mission = 500000;
//Обязательные статьи расходов
const expenses1 = prompt('Введите обязательную статью расходов?', 'Квартплата');
const amount1 = +prompt('Во сколько это обойдется?', '10000');
const expenses2 = prompt('Введите обязательную статью расходов?', 'Питание');
const amount2 = +prompt('Во сколько это обойдется?', '15000');

// дневной бюджет
const budgetDay = Math.floor(money / 30); 

// Вычисляем бюджет на месяц
const budgetMonth = money - (amount1 + amount2);

//за сколько месяцев будет достигнута цель
const period = Math.ceil(mission / budgetMonth);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(budgetDay);
console.log(`Бюджет на месяц: ${budgetMonth}`);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}

const arrExpenses = addExpenses.toLowerCase().split(',');
console.log(arrExpenses.map(item => item.trim()));