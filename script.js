const title = document.querySelector('div.title');
const h2 = document.createElement('h2');
const h2Text = document.createTextNode('Jiraiya\'s Novels');
h2.appendChild(h2Text);
title.appendChild(h2);

const shelf = document.querySelector('.shelf');
const novels = ['Innocence', 'Paradise', 'Tactics', 'Violence'];

let i = 1;

shelf.append(...genBooks());

lineUp(shelf);

function lineUp(shelf) {
    let shiftX = 0;
    let maxHeight = 0;

    for (const book of shelf.children) {
        book.style.left = shiftX + 'px';
        shiftX += book.offsetWidth + 2;

        maxHeight = Math.max(maxHeight, book.offsetHeight)
    }

    shelf.style.width = shiftX + 'px';
    shelf.style.height = maxHeight + 'px';
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function genBooks() {
    const books = [];  

    for (const novel of novels) {
        const book = genBook(novel);
        books.push(book);
        book.addEventListener('mouseover', bringFront);
    }

    return books;
}

function genBook(novel) {
    const w = rnd(40, 90);
    const h = rnd(420, 480);
    const d = rnd(250, 300);
    
    const book = buildParallelepiped(w, h, d);

    book.style.setProperty('--spine', `url("pictures/books/${novel}/spin_cover.png")`);
    book.style.setProperty('--cover', `url("pictures/books/${novel}/main_cover.png")`);
    
    return book;
}

function buildParallelepiped(width, height, depth) {
    const wrapper = document.createElement('li');
    const box = document.createElement('ul');
    const frontSide = document.createElement('li');
    const backSide = document.createElement('li');
    const topSide = document.createElement('li');
    const bottomSide = document.createElement('li');
    const leftSide = document.createElement('li');
    const rightSide = document.createElement('li');

    wrapper.appendChild(box).append(frontSide, backSide, topSide, bottomSide, leftSide, rightSide);

    wrapper.classList.add('parallelepiped-wrapper');
    box.classList.add('parallelepiped');
    frontSide.classList.add('side', 'front');
    backSide.classList.add('side', 'back');
    topSide.classList.add('side', 'top');
    bottomSide.classList.add('side', 'bottom');
    leftSide.classList.add('side', 'left');
    rightSide.classList.add('side', 'right');

    wrapper.style.setProperty('--w', width + 'px');
    wrapper.style.setProperty('--h', height + 'px');
    wrapper.style.setProperty('--d', depth + 'px');
    
    return wrapper;
}

function bringFront(e) {
    const book = e.currentTarget

    book.style.order = i++;
}