// lesson01
let money = 2400;
let income = 500;
let addExpenses = 'комуналка, стиралка, палка, металка, такси, каталка';
let deposit = true;
let mission = 50000;
let period = 6;
let expenses1;
let expenses2;
let amount1;
let amount2;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay = 100
console.log('budgetDay = ', budgetDay);

// lesson02
money = +prompt('Ваш месячный доход ?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько это обойдется?');
amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('mission = ', Math.ceil(mission/budgetMonth));
budgetDay = Math.floor(budgetMonth/30);
console.log('budgetDay', budgetDay)

switch (true) {
    case budgetDay >= 1200:
        alert('У вас высокий уровень дохода');
        break;
    case budgetDay < 1200 && budgetDay >= 600:
        alert('У вас средний уровень дохода');
        break;
    case budgetDay < 600 && budgetDay >= 0:
        alert('К сожалению у вас уровень дохода ниже среднего');
        break;
    default: alert('Что то пошло не так');
}