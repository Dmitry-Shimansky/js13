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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дполный источник заработка ?')) {
            let itemIncome;
            let cashIncome
            do {
                itemIncome = prompt('Какой у вас дополнительный зароботок ?', 'Таксую');
            } while (typeof itemIncome !== 'string');
            do {
                cashIncome = +prompt('Сколько в месяц вы а этом зарабатываете ?', 10000);
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'катамаран, самолет, вертолет');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        const expensesArray = ['Мойка машины', 'Шопинг жены'];
        expensesArray.forEach((item) => {
            let key;
            let value = 0;
            do {
                key = prompt('Введите обязательную статью расходов?', item)
            } while (typeof key !== 'string');
            do {
                value = +prompt('Во сколько это обойдется?', 500);
            } while (!isNumber(value))
            appData.expenses[key] = value;
        });
    },
    getExpensesMonth: function() {
        for (const argumentsKey in appData.expenses) {
            appData.expensesMonth += +appData.expenses[argumentsKey];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return appData.period = Math.ceil(appData.mission / appData.budgetMonth);
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
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = +prompt('Какой годовой процент ?', 10);
            }while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = +prompt('Какая сумма заложена ?', 10000);
            }while (!isNumber(appData.percentDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
}

console.log('Уровень дохода = ', appData.budget);

appData.asking();

appData.getExpensesMonth();
console.log('Расходы за месяц = ', appData.expensesMonth);

appData.getBudget();

console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяца')

console.log(appData.getStatusIncome());

appData.getInfoDeposit();
console.log(appData.calcSavedMoney());

console.log(appData.addExpenses.map((str) => str[0].toUpperCase() + str.slice(1)).toString());

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}

