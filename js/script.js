'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
        do {
            money = +prompt('Ваш месячный доход ?', 5000);
        }
        while (!isNumber(money))
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'катамаран, самолет, вертолет');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        const expensesArray = ['Мойка машины', 'Шопинг жены'];
        expensesArray.forEach((item) => {
            const key = prompt('Введите обязательную статью расходов?', item);
            let value = 0;
            do {
                value = +prompt('Во сколько это обойдется?', 500);
            } while (!isNumber(value))
            appData.expenses[key] = value;
        });
    },
    getExpensesMonth: function() {
        let sum = 0;
        for (const argumentsKey in appData.expenses) {
            sum += appData.expenses[argumentsKey];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function() {
        appData.budgetDay = Math.floor(appData.budget - appData.expensesMonth / 30);
        appData.budgetMonth = appData.budget - appData.expensesMonth;
    },
    getTargetMonth: function() {
        appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
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
    }
}

console.log('Уровень дохода = ', appData.budget);

appData.asking();

appData.getExpensesMonth();
console.log('Расходы за месяц = ', appData.expensesMonth);

appData.getBudget();

appData.getTargetMonth();
console.log('Цель будет достигнута за ' + appData.period + ' месяца')

console.log(appData.getStatusIncome());