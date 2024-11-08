const body = document.querySelector('body');
const aside = document.querySelector('aside');
let bookArray = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');

aside.prepend(bookArray[1]);
aside.append(bookArray[2]);
bookArray = document.querySelectorAll('.book');
bookArray[1].after(bookArray[3]);

body.style.backgroundImage = `url(./image/you-dont-know-js.jpg)`;
body.style.backgroundSize = 'auto';

bookArray = document.querySelectorAll('.book');
bookArray[2].querySelector('a').innerText = 'Книга 3. this и Прототипы Объектов';

adv.remove();

let book2 = bookArray[1].querySelectorAll('li');
book2[3].after(book2[6]);
book2 = bookArray[1].querySelectorAll('li');
book2[4].after(book2[8]);
book2 = bookArray[1].querySelectorAll('li');
book2[9].after(book2[2]);

let book5 = bookArray[4].querySelectorAll('li');
book5[1].after(book5[9]);
book5 = bookArray[4].querySelectorAll('li');
book5[5].after(book5[3]);
book5 = bookArray[4].querySelectorAll('li');
book5[8].after(book5[6]);

let book6 = bookArray[5].querySelectorAll('li');
const clonedElement8 = book6[8].cloneNode(true);
book6[8].after(clonedElement8);
book6 = bookArray[5].querySelectorAll('li');
book6[9].innerText = 'Глава 8: За пределами ES6';