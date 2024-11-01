//lesson02
const num = 266219;

const sumOfNumbers = num.toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a * b) ** 3;

const result = sumOfNumbers.toString().substring(0, 2);

// alert(result);

//lesson03
let lang = prompt('What lang do you want ?');

if (lang === 'en') {
    alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else if (lang === 'ru') {
    alert('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
}

switch (lang) {
    case 'en':
        alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
        break;
    case 'ru':
        alert('Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье');
        break;
}

let days = [
    ['Monday', 'Понедельник'],
    ['Tuesday', 'Вторник'],
    ['Wednesday', 'Среда'],
    ['Thursday', 'Четверг'],
    ['Friday', 'Пятница'],
    ['Saturday', 'Суббота'],
    ['Sunday', 'Воскресенье']
]
const week = [];

days.forEach((day) => {
    lang === 'en' ? week.push(day[0]) : week.push(day[1]);
});

alert(week);

let namePerson = prompt('What is name of person ?');

namePerson === ''