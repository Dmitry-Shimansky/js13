let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Front-End',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'катамаран, самолет, вертолет'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 50000,
    period = 6;

let start = function () {
    do {
        money = +prompt('Ваш месячный доход ?', 5000);
    }
    while (!isNumber(money))
};

start();

const showTypeOf = function (variable) {
    console.log(typeof variable);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(', '));

function getExpensesMonth() {
    let sum = 0;
    const expensesArray = ['Мойка машины', 'Шопинг жены']

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов?', expensesArray[i]);

        do {
            sum += +prompt('Во сколько это обойдется?', 500);
        }
        while (!isNumber(sum))
    }

    console.log('Расходы за месяц = ', sum);

    return sum;
}

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function () {
    const accumulatedMonth = money - expensesAmount;
    console.log('accumulatedMonth = ', accumulatedMonth);
    return accumulatedMonth;
}

const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
    const goal = Math.ceil(mission / accumulatedMonth)
    console.log('targetMonth = ', goal);
    return goal;
}

let budgetDay = Math.floor(getAccumulatedMonth() / 30);
console.log('budgetDay = ', budgetDay);

console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяца')

const getStatusIncome = function () {

    switch (true) {
        case budgetDay >= 1200:
            return ('У вас высокий уровень дохода');
        case budgetDay < 1200 && budgetDay >= 600:
            return ('У вас средний уровень дохода');
        case budgetDay < 600 && budgetDay >= 0:
            return ('К сожалению у вас уровень дохода ниже среднего');
        default:
            alert('Что то пошло не так');
    }
};

console.log(getStatusIncome());