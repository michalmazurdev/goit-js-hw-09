const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEL = document.querySelector('button[data-stop]');
let intervalId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnEl.addEventListener('click', () => {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnEl.setAttribute('disabled', true);
  stopBtnEL.removeAttribute('disabled');
});
stopBtnEL.addEventListener('click', () => {
  clearInterval(intervalId);
  stopBtnEL.setAttribute('disabled', true);
  startBtnEl.removeAttribute('disabled');
});
