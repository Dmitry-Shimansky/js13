const num = 266219;

const sumOfNumbers = num.toString()
    .split('')
    .map(Number)
    .reduce((a, b) => a * b) ** 3;

const result = sumOfNumbers.toString().substring(0, 2);

alert(result);