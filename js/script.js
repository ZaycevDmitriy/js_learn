const money = 45000; // Доход за месяц
const income = 5000;  // дополнительный доход
const ddExpenses = 'Учёба, Коммуналка, Транспорт'; // дополнительные расходы через запятую
const deposit = false;
const mission = 500000; //сумма которую нужно накопить
const period = 10; // период от 1 до 12 (месяцев)

console.log(typeof money);
console.log(typeof income);
console.log(typeof ddExpenses);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

const arrExpenses = ddExpenses.toLowerCase().split(', ');
console.log(arrExpenses);

const budgetDay = money / 30; // дневной бюджет
console.log(budgetDay);