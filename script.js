// script.js
const buttons = ['red', 'green', 'yellow', 'blue'];
let gameSequence = [];
let userSequence = [];
let score = 0;
let allowUserInput = false;

const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

const playSound = (color) => {
  const sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttons.indexOf(color) + 1}.mp3`);
  sound.play();
};

const flash = (color) => {
  const btn = document.getElementById(color);
  btn.classList.add('glow');
  playSound(color);
  setTimeout(() => btn.classList.remove('glow'), 400);
};

const nextColor = () => {
  const randomColor = buttons[Math.floor(Math.random() * buttons.length)];
  gameSequence.push(randomColor);
  userSequence = [];
  playSequence();
};

const playSequence = async () => {
  allowUserInput = false;
  for (let i = 0; i < gameSequence.length; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        flash(gameSequence[i]);
        resolve();
      }, 600);
    });
    await new Promise((r) => setTimeout(r, 400));
  }
  allowUserInput = true;
};

const handleUserClick = (color) => {
  if (!allowUserInput) return;

  userSequence.push(color);
  flash(color);

  const currentIndex = userSequence.length - 1;

  if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
    alert(`Wrong! Game Over. Final Score: ${score}`);
    resetGame();
    return;
  }

  if (userSequence.length === gameSequence.length) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    setTimeout(() => nextColor(), 1000);
  }
};

const resetGame = () => {
  gameSequence = [];
  userSequence = [];
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  allowUserInput = false;
};

startBtn.addEventListener('click', () => {
  resetGame();
  nextColor();
});

buttons.forEach(color => {
  document.getElementById(color).addEventListener('click', () => handleUserClick(color));
});
