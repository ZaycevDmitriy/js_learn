'use strict';
const buttonStart = document.getElementById('start');
const buttonCancel = document.getElementById('cancel');
const buttonIncomeAdd = document.querySelector('.income_add');
const buttonExpensesAdd = document.querySelector('.expenses_add');
const depositCheck = document.querySelector('#deposit-check');
const inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.getElementsByClassName('income-items');
const expensesItems = document.getElementsByClassName('expenses-items');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const btnPlusAll = document.querySelectorAll('.btn_plus');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n); // если число то функция вернет true
};

const HIGH_DAILY_INCOME = 1200;
const AVERAGE_DAILY_INCOME = 600;

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
  this.budget = +salaryAmount.value;
  salaryAmount.value = '';

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddExpenses();
  this.getAddIncome();

  this.showResult();
  this.blockInput();
  buttonStart.style.display = 'none';
  buttonCancel.style.display = 'block';
};

AppData.prototype.getAddIncome = function () {
  this.addIncome = [];
  inputAdditionalIncomeItems.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
    item.value = '';
  });
};

AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItems = incomeItems[0].cloneNode(true);
  cloneIncomeItems.querySelector('.income-title').value = '';
  cloneIncomeItems.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonIncomeAdd);
  if (incomeItems.length === 3) {
    buttonIncomeAdd.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  this.income = {};
  for (const item of incomeItems) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = +cashIncome;
    }
    item.querySelector('.income-title').value = '';
    item.querySelector('.income-amount').value = '';
  }

  this.incomeMonth = 0;

  for (let key in this.income) {
    this.incomeMonth += this.income[key];
  }
};

AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItems = expensesItems[0].cloneNode(true);
  cloneExpensesItems.querySelector('.expenses-title').value = '';
  cloneExpensesItems.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonExpensesAdd);

  if (expensesItems.length === 3) {
    buttonExpensesAdd.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  this.expenses = {};
  for (const item of expensesItems) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = +cashExpenses;
    }
    item.querySelector('.expenses-title').value = '';
    item.querySelector('.expenses-amount').value = '';
  }
};

AppData.prototype.getAddExpenses = function () {
  this.addExpenses = [];
  const addExpenses = inputAdditionalExpensesItem.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
  inputAdditionalExpensesItem.value = '';
};

// Вычисляем сумма всех обязательных расходов за месяц
AppData.prototype.getExpensesMonth = function () {
  this.expensesMonth = 0;
  for (let item in this.expenses) {
    this.expensesMonth += this.expenses[item];
  }
};

AppData.prototype.getBudget = function () {
  //Вычисляем накопления за месяц (Доходы минус расходы)
  this.budgetMonth = 0;
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  // дневной бюджет
  this.budgetDay = 0;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  const targetMonth = Math.ceil(inputTargetAmount.value / this.budgetMonth);
  inputTargetAmount.value = '';
  return targetMonth;
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    let value;

    do {
      value = prompt('Какой годовой процент', '10');
    } while (!isNumber(value));
    this.percentDeposit = +value;

    do {
      value = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(value));
    this.moneyDeposit = +value;
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * inputPeriodSelect.value;
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  inputPeriodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
};

AppData.prototype.blockInput = function () {
  document.querySelectorAll('input[type=text]').forEach((input) => {
    input.disabled = true;
  });
  btnPlusAll.forEach((btn) => {
    btn.disabled = true;
  });
};

AppData.prototype.reset = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;

  document.querySelectorAll('.expenses-items').forEach((item, index) => {
    if (index > 0) {
      item.remove();
    }
  });

  buttonExpensesAdd.style.display = 'block';

  document.querySelectorAll('.income-items').forEach((item, index) => {
    if (index > 0) {
      item.remove();
    }
  });

  buttonIncomeAdd.style.display = 'block';

  document.querySelectorAll('input[type=text]').forEach((input) => {
    input.disabled = false;
    input.value = '';
  });

  btnPlusAll.forEach((btn) => {
    btn.disabled = false;
  });

  inputPeriodSelect.value = 1;
  periodAmount.textContent = inputPeriodSelect.value;

  document.querySelectorAll('[class*="-value"]').forEach((input) => {
    input.disabled = true;
  });

  buttonStart.style.display = 'block';
  buttonCancel.style.display = 'none';
};

//проверяем на пустую строку инпут Месячный доход
AppData.prototype.checkSalary = function () {
  buttonStart.disabled = salaryAmount.value.trim() === '';
  buttonStart.disabled = !isNumber(salaryAmount.value);
};

AppData.prototype.eventListeners = function () {
  this.checkSalary();
  salaryAmount.addEventListener('input', this.checkSalary);
  buttonCancel.addEventListener('click', this.reset.bind(this));
  buttonStart.addEventListener('click', this.start.bind(this));
  buttonExpensesAdd.addEventListener('click', this.addExpensesBlock);
  buttonIncomeAdd.addEventListener('click', this.addIncomeBlock);
  inputPeriodSelect.addEventListener('input', () => periodAmount.textContent = inputPeriodSelect.value);
};

const appData = new AppData();

console.log(appData);

appData.eventListeners();