let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);

  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.className = 'Pacman';
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;
  newimg.style.left = position + 'px';
  newimg.style.top = position + 'px';

  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
  };
}

// Function to move every pacmen.
function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
    
  });
  setTimeout(update, 20);
}

// Function to check collisions of an item with the screen border
function checkCollisions(item) {
  let pageWidth = window.innerWidth;
  let pageHeight = window.innerHeight;
  if (item.position.x + item.newimg.width > pageWidth) {item.velocity.x *= -1}
  if (item.position.x < 0) {item.velocity.x *= -1}
  if (item.position.y + item.newimg.width > pageHeight) {item.velocity.y *= -1 }
  if (item.position.y < 0) {item.velocity.y *= -1}
}

function makeOne() {
  pacMen.push(makePac());
}

if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
