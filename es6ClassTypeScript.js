'use strict';

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
    allTextInputsData = document.querySelectorAll('.data input[type=text]'),
    allTextInputsResult = document.querySelectorAll('.result input[type=text]'),
    cancelBtn = document.getElementById('cancel');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

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
    }

    isNumber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    check = () => {
        this.isNumber(salaryInput.value) ? calcBtn.disabled = false : calcBtn.disabled = true;
    };

    start = () => {
        allTextInputsData.forEach((item) => {
            item.disabled = true;
        });
        addExpensesBtn.setAttribute('disabled', 'true');
        addAdditionalIncomeBtn.setAttribute('disabled', 'true');
        calcBtn.style.display = 'none';
        cancelBtn.style.display = 'block';

        this.budget = +salaryInput.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    };

    showResult = () => {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    };

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value= '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    };
    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };
    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        addAdditionalIncomeBtn.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addAdditionalIncomeBtn.style.display = 'none';
        }
    };
    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    getAddExpenses() {
        let addExpenses = additionalExpensesInput.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    };
    getAddIncome() {
        additionalIncomeItems.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        })
    };
    getExpensesMonth() {
        for (const argumentsKey in this.expenses) {
            this.expensesMonth += +this.expenses[argumentsKey];
        }
    };
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    getTargetMonth() {
        return Math.ceil(targetInput.value / this.budgetMonth);
    };
    getStatusIncome() {
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
    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = +prompt('Какой годовой процент ?', 12);
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = +prompt('Какая сумма заложена ?', 10000);
            } while (!isNumber(this.percentDeposit));
        }
    };

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    };

    changePeriod(e) {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = e.target.value;
    };
    reset() {
        allTextInputsData.forEach((item) => {
            item.disabled = false;
            item.value = '';
        });
        allTextInputsResult.forEach((item) => {
            item.value = '';
        });
        document.querySelectorAll('.income-items').forEach((item) => {
            item.remove();
        });
        addAdditionalIncomeBtn.before(incomeItems[0]);
        document.querySelectorAll('.expenses-items').forEach((item) => {
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
        cancelBtn.style.display = 'none';
        depositCheckBox.checked = false;
        addExpensesBtn.removeAttribute('disabled');
        addAdditionalIncomeBtn.removeAttribute('disabled');
        periodSelect.value = '0';
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.innerHTML = periodSelect.value;
    };

    eventListeners() {
        calcBtn.addEventListener('click', this.start.bind(this));
        salaryInput.addEventListener('keyup', this.check);
        cancelBtn.addEventListener('click', this.reset.bind(this));
        addExpensesBtn.addEventListener('click', this.addExpensesBlock);
        addAdditionalIncomeBtn.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.changePeriod);
    };
}

const appData = new AppData();

calcBtn.setAttribute('disabled', 'true');
appData.eventListeners();

console.log(appData);