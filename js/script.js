'use strict';
const buttonStart = document.getElementById('start'),
  buttonCancel = document.getElementById('cancel'),
  buttonIncomeAdd = document.querySelector('.income_add'),
  buttonExpensesAdd = document.querySelector('.expenses_add'),
  inputAdditionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeItems = document.getElementsByClassName('income-items'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
  inputTargetAmount = document.querySelector('.target-amount'),
  inputPeriodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  btnPlusAll = document.querySelectorAll('.btn_plus'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  depositCheck = document.querySelector('#deposit-check');

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n); // если число то функция вернет true
};
class AppData {
  constructor() {
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

    this.eventListeners();
  }

  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
    this.blockInput();
    buttonStart.style.display = 'none';
    buttonCancel.style.display = 'block';
  }

  getExpInc() {
    this.income = {};
    this.expenses = {};
    this.incomeMonth = 0;
    const _this = this;

    function getCount(item) {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        _this[startStr][itemTitle] = +itemAmount;
      }
    }

    for (const item of incomeItems) getCount(item);
    for (const item of expensesItems) getCount(item);

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }

  addExpIncBlock(element) {
    const inputItem = element.previousElementSibling;
    const startStr = inputItem.className.split('-')[0];
    const count = element.parentNode.querySelectorAll(`.${startStr}-items`).length;
    const cloneItems = inputItem.cloneNode(true);
    cloneItems.querySelector(`.${startStr}-title`).value = '';
    cloneItems.querySelector(`.${startStr}-amount`).value = '';
    element.before(cloneItems);
    if (count + 1 === 3) element.style.display = 'none';
  }

  getAddExpInc() {
    this.addIncome = [];
    this.addExpenses = [];
  }

  getAddIncome() {
    this.addIncome = [];
    inputAdditionalIncomeItems.forEach((item) => { //additional_income-item
      item = item.value.trim();
      if (item !== '') {
        this.addIncome.push(item);
      }
    });
  }

  getAddExpenses() {
    this.addExpenses = [];
    const addExpenses = inputAdditionalExpensesItem.value.split(','); //additional_expenses-item
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  // Вычисляем сумма всех обязательных расходов за месяц
  getExpensesMonth() {
    this.expensesMonth = 0;
    for (let item in this.expenses) {
      this.expensesMonth += this.expenses[item];
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    //Вычисляем накопления за месяц (Доходы минус расходы)
    this.budgetMonth = 0;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    // дневной бюджет
    this.budgetDay = 0;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(inputTargetAmount.value / this.budgetMonth);
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  calcPeriod() {
    return this.budgetMonth * inputPeriodSelect.value;
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    inputPeriodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcPeriod());
  }

  blockInput() {
    document.querySelectorAll('input[type=text]').forEach((input) => {
      input.disabled = true;
    });
    btnPlusAll.forEach((btn) => {
      btn.disabled = true;
    });
  }

  reset() {
    Object.assign(this, new AppData);

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

    depositCheck.checked = false;
    this.depositHandler();
    this.changePercent();

    this.checkSalary();
  }

  //проверяем на пустую строку инпут Месячный доход

  checkSalary() {
    buttonStart.disabled = salaryAmount.value.trim() === '';
    buttonStart.disabled = !isNumber(salaryAmount.value);
  }

  checkPercent() {
    if (isNumber(depositPercent.value) && depositPercent.value <= 100) {
      return;
    } else {
      alert('Введите число в поле от 0 до 100');
      depositPercent.value = 0;
    }
  }

  changePercent = () => {
    const valueSelect = depositBank.value;
    if (valueSelect === 'other') {
      depositPercent.value = 0;
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('change', this.checkPercent);
      this.checkPercent();
    } else {
      depositPercent.removeEventListener('change', this.checkPercent);
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    this.checkSalary();
    salaryAmount.addEventListener('input', this.checkSalary);
    buttonCancel.addEventListener('click', this.reset.bind(this));
    buttonStart.addEventListener('click', this.start.bind(this));
    btnPlusAll.forEach((item) => {
      item.onclick = (event) => this.addExpIncBlock(event.target);
    });
    inputPeriodSelect.addEventListener('input', () => periodAmount.textContent = inputPeriodSelect.value);
    depositCheck.addEventListener('change', this.depositHandler.bind(this)); //.bind(this)
  }
}
const appData = new AppData();