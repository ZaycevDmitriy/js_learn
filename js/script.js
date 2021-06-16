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
  },

  getAddIncome: function () {
    this.addIncome = [];
    inputAdditionalIncomeItems.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
      item.value = '';
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
  },

  getAddExpenses: function () {
    this.addExpenses = [];
    const addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
    inputAdditionalExpensesItem.value = '';
  },

// Вычисляем сумма всех обязательных расходов за месяц
  getExpensesMonth: function () {
    this.expensesMonth = 0;
    for (let item in this.expenses) {
      this.expensesMonth += this.expenses[item];
    }
  },

  getBudget: function () {
    //Вычисляем накопления за месяц (Доходы минус расходы)
    this.budgetMonth = 0;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    // дневной бюджет
    this.budgetDay = 0;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  getTargetMonth: function () {
    const targetMonth = Math.ceil(inputTargetAmount.value / this.budgetMonth);
    inputTargetAmount.value = '';
    return targetMonth;
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
    return this.budgetMonth * inputPeriodSelect.value;
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    inputPeriodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
  },

  blockInput: function () {
    document.querySelectorAll('input[type=text]').forEach((input) => {
      input.disabled = true;
    });
    btnPlusAll.forEach((btn) => {
      btn.disabled = true;
    });
  },

  reset: function () {
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
      if (index > 0) item.remove();
    });

    buttonExpensesAdd.style.display = 'block';

    document.querySelectorAll('.income-items').forEach((item, index) => {
      if (index > 0) item.remove();
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
  }
};

//проверяем на пустую строку инпут Месячный доход
if (salaryAmount.value === '') {
  buttonStart.disabled = true;
}

salaryAmount.addEventListener('input', () => {
  buttonStart.disabled = salaryAmount.value === '';
});

function hardBindStart () {
  appData.start.call(appData);
}

function hardBindReset() {
  appData.reset.call(appData);
}
buttonCancel.addEventListener('click', hardBindReset);
buttonStart.addEventListener('click', hardBindStart);
buttonExpensesAdd.addEventListener('click', appData.addExpensesBlock);
buttonIncomeAdd.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('input', () => periodAmount.textContent = inputPeriodSelect.value);
