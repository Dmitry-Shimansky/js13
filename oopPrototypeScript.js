'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const calcBtn = document.getElementById('start'),
        addAdditionalIncomeBtn = document.querySelector('.income button'),
        addExpensesBtn = document.querySelector('.expenses button'),
        depositCheckBox = document.querySelector('#deposit-check'),
        additionalIncomeItems = document.querySelectorAll('.additional_income input'),
        budgetMonthValue = document.querySelector('.budget_month-value'),
        budgetDayValue = document.querySelector('.budget_day-value'),
        expensesMonthValue = document.querySelector('.expenses_month-value'),
        additionalIncomeValue = document.querySelector('.additional_income-value'),
        additionalExpensesValue = document.querySelector('.additional_expenses-value'),
        incomePeriodValue = document.querySelector('.income_period-value'),
        targetMonthValue = document.querySelector('.target_month-value'),
        salaryInput = document.querySelector('.salary-amount'),
        additionalExpensesInput = document.querySelector('.additional_expenses input'),
        targetInput = document.querySelector('.target input'),
        periodSelect = document.querySelector('.period-select'),
        allTextInputsResult = document.querySelectorAll('.result input[type=text]'),
        cancelBtn = document.getElementById('cancel');
    let incomeItems = document.querySelectorAll('.income-items'),
        expensesItems = document.querySelectorAll('.expenses-items'),
        allTextInputsData = document.querySelectorAll('.data input[type=text]');


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

    AppData.prototype.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    AppData.prototype.check = function () {
        this.isNumber(salaryInput.value) ? calcBtn.disabled = false : calcBtn.disabled = true;
    };

    AppData.prototype.start = function () {
        allTextInputsData = document.querySelectorAll('.data input[type=text]');
        allTextInputsData.forEach(function (item) {
            item.disabled = true;
        });
        addExpensesBtn.setAttribute('disabled', 'true');
        addAdditionalIncomeBtn.setAttribute('disabled', 'true');
        calcBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
        periodSelect.removeAttribute('disabled');

        this.budget = +salaryInput.value;
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc()
        this.getBudget();
        this.showResult();
    };

    AppData.prototype.showResult = function () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
    };
    AppData.prototype.addExpIncBlock = function (e) {
        const targetClassName = e.target.parentNode.className;
        const targetArray = targetClassName === 'expenses' ? expensesItems[0] : incomeItems[0];
        const button = targetClassName === 'expenses' ? addExpensesBtn : addAdditionalIncomeBtn;
        const cloneItem = targetArray.cloneNode(true);
        cloneItem.querySelector(`.${targetClassName}-title`).value = '';
        cloneItem.querySelector(`.${targetClassName}-amount`).value = '';
        button.before(cloneItem);
        const itemsArray = document.querySelectorAll(`.${targetClassName}-items`);
        if (itemsArray.length === 3) {
            button.style.display = 'none';
        }
    };
    AppData.prototype.getExpInc = function () {
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        const count = (item) => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    AppData.prototype.getAddExpInc = function () {
        const addExpenses = additionalExpensesInput.value.split(',');
        const expenses = (item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }
        const incomes = (item) => {
            item = item.value.trim();
            if (item !== '') {
                this.addIncome.push(item);
            }
        }
        addExpenses.forEach(expenses);
        additionalIncomeItems.forEach(incomes);
    };
    AppData.prototype.getExpensesMonth = function () {
        for (const argumentsKey in this.expenses) {
            this.expensesMonth += +this.expenses[argumentsKey];
        }
    };
    AppData.prototype.getBudget = function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    AppData.prototype.getTargetMonth = function () {
        return Math.ceil(targetInput.value / this.budgetMonth);
    };
    AppData.prototype.getStatusIncome = function () {
        switch (true) {
            case this.budgetDay >= 1200:
                return ('У вас высокий уровень дохода');
            case this.budgetDay < 1200 && this.budgetDay >= 600:
                return ('У вас средний уровень дохода');
            case this.budgetDay < 600 && this.budgetDay >= 0:
                return ('К сожалению у вас уровень дохода ниже среднего');
            default:
                alert('Что то пошло не так');
        }
    };
    AppData.prototype.getInfoDeposit = function () {
        if (this.deposit) {
            do {
                this.percentDeposit = +prompt('Какой годовой процент ?', 12);
            } while (!this.isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = +prompt('Какая сумма заложена ?', 10000);
            } while (!this.isNumber(this.percentDeposit));
        }
    };
    AppData.prototype.calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.changePeriod = function (e) {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = e.target.value;
    };
    AppData.prototype.reset = function () {
        allTextInputsData.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });
        allTextInputsResult.forEach(function (item) {
            item.value = '';
        });
        document.querySelectorAll('.income-items').forEach(function (item) {
            item.remove();
        });
        addAdditionalIncomeBtn.before(incomeItems[0]);
        document.querySelectorAll('.expenses-items').forEach(function (item) {
            item.remove();
        });
        addExpensesBtn.before(expensesItems[0]);

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

        calcBtn.style.display = 'block';
        calcBtn.setAttribute('disabled', 'true');
        cancelBtn.style.display = 'none';
        depositCheckBox.checked = false;
        addExpensesBtn.removeAttribute('disabled');
        addExpensesBtn.style.display = 'block';
        addAdditionalIncomeBtn.removeAttribute('disabled');
        addAdditionalIncomeBtn.style.display = 'block';
        periodSelect.value = '0';
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.innerHTML = periodSelect.value;
        periodSelect.setAttribute('disabled', 'true');
    };

    AppData.prototype.eventListeners = function () {
        const _this = this;
        calcBtn.addEventListener('click', _this.start.bind(_this));
        salaryInput.addEventListener('keyup', _this.check.bind(_this));
        cancelBtn.addEventListener('click', _this.reset.bind(_this));
        addExpensesBtn.addEventListener('click', _this.addExpIncBlock);
        addAdditionalIncomeBtn.addEventListener('click', _this.addExpIncBlock);
        periodSelect.addEventListener('input', _this.changePeriod);
    };
    const appData = new AppData();

    calcBtn.setAttribute('disabled', 'true');
    periodSelect.setAttribute('disabled', 'true');
    appData.eventListeners();
});


// console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяца')

// console.log(appData.addExpenses.map((str) => str[0].toUpperCase() + str.slice(1)).toString());
