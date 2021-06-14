'use strict';
const buttonStart = document.getElementById('start');
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


const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n); // если число то функция вернет true
}

const HIGH_DAILY_INCOME = 1200;
const AVERAGE_DAILY_INCOME = 600;

const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();

    appData.showResult();
  },

  getAddIncome: function () {
    inputAdditionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },

  addIncomeBlock: function () {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    cloneIncomeItems.querySelector('.income-title').value = '';
    cloneIncomeItems.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, buttonIncomeAdd);
    if (incomeItems.length === 3) {
      buttonIncomeAdd.style.display = 'none';
    }
  },

  getIncome: function () {
    for (const item of incomeItems) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    }

    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },

  addExpensesBlock: function () {
    const cloneExpensesItems = expensesItems[0].cloneNode(true);
    cloneExpensesItems.querySelector('.expenses-title').value = '';
    cloneExpensesItems.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, buttonExpensesAdd);

    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = 'none';
    }
  },

  getExpenses: function () {
    for (const item of expensesItems) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    }
  },

  getAddExpenses: function () {
    const addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

// Вычисляем сумма всех обязательных расходов за месяц
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let item in appData.expenses) {
      appData.expensesMonth += appData.expenses[item];
    }    
  },

  getBudget: function () {
    //Вычисляем накопления за месяц (Доходы минус расходы)
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    // дневной бюджет
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {    
    return Math.ceil(inputTargetAmount.value / appData.budgetMonth);
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

  calcPeriod: function () {
    return appData.budgetMonth * inputPeriodSelect.value;
  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    inputPeriodSelect.addEventListener('input', () => incomePeriodValue.value = appData.calcPeriod());
  },
};

//проверяем на пустую строку инпут Месячный доход 
if (salaryAmount.value === '') {
  buttonStart.disabled = true;
}

salaryAmount.addEventListener('input', () => {
  buttonStart.disabled = false;
});

buttonStart.addEventListener('click', appData.start);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('input', () => periodAmount.textContent = inputPeriodSelect.value);
