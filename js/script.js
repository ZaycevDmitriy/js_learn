const money = 45000; // Доход за месяц
const income = 5000;  // дополнительный доход
const addExpenses = 'Учёба, Коммуналка, Транспорт'; // дополнительные расходы через запятую
const deposit = false;
const mission = 500000; //сумма которую нужно накопить
const period = 10; // период от 1 до 12 (месяцев)

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

const arrExpenses = addExpenses.toLowerCase().split(',');
console.log(arrExpenses.map(item => item.trim()));

const budgetDay = money / 30; // дневной бюджет
console.log(budgetDay);