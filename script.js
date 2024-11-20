'use strict';

let calcBtn = document.getElementById('start'),
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
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesInput = document.querySelector('.additional_expenses input'),
    targetInput = document.querySelector('.target input'),
    periodSelect = document.querySelector('.period-select'),
    allTextInputsData = document.querySelectorAll('.data input[type=text]'),
    allTextInputsResult = document.querySelectorAll('.result input[type=text]'),
    cancelBtn = document.getElementById('cancel');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
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
        this.budget = +salaryInput.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value= '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpensesBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            addExpensesBtn.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        addAdditionalIncomeBtn.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            addAdditionalIncomeBtn.style.display = 'none';
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            this.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesInput.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItems.forEach(function(item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },
    getExpensesMonth: function () {
        for (const argumentsKey in this.expenses) {
            this.expensesMonth += +this.expenses[argumentsKey];
        }
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetInput.value / appData.budgetMonth);
    },
    getStatusIncome: function () {
        switch (true) {
            case appData.budgetDay >= 1200:
                return ('У вас высокий уровень дохода');
            case appData.budgetDay < 1200 && appData.budgetDay >= 600:
                return ('У вас средний уровень дохода');
            case appData.budgetDay < 600 && appData.budgetDay >= 0:
                return ('К сожалению у вас уровень дохода ниже среднего');
            default:
                alert('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент ?', 10);
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена ?', 10000);
            } while (!isNumber(appData.percentDeposit));
        }
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    changePeriod: function(e) {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = e.target.value;
    },
    reset: function() {
        allTextInputsData.forEach(function(item) {
            item.disabled = false;
            item.value = '';
        });
        allTextInputsResult.forEach(function(item) {
            item.value = '';
        });
        document.querySelectorAll('.income-items').forEach(function(item) {
            item.remove();
        });
        addAdditionalIncomeBtn.before(incomeItems[0]);
        document.querySelectorAll('.expenses-items').forEach(function(item) {
            item.remove();
        });
        addExpensesBtn.before(expensesItems[0]);
        // const uncheck = window.getComputedStyle(document.querySelector('.deposit-checkmark'), ':after')
        // console.log(uncheck);
        // uncheck.display = 'none';
        calcBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
    }
}

appData.start.bind(appData);
calcBtn.disabled = true;

salaryInput.addEventListener('input', function() {
    salaryInput.value != '' ? calcBtn.disabled = false : calcBtn.disabled = true;
});
calcBtn.addEventListener('click', function() {
    if (isNumber(salaryInput.value)) {
        appData.start();
        allTextInputsData.forEach(function(item) {
           item.disabled = true;
        });
        calcBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
    }
});
cancelBtn.addEventListener('click', appData.reset);
addExpensesBtn.addEventListener('click', appData.addExpensesBlock);
addAdditionalIncomeBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriod);

// console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяца')

// console.log(appData.addExpenses.map((str) => str[0].toUpperCase() + str.slice(1)).toString());
