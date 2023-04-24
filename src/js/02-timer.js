import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const inputEl = document.getElementById('datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const daysCounterEl = document.querySelector('span[data-days]');
const hoursCounterEl = document.querySelector('span[data-hours]');
const minutesCounterEl = document.querySelector('span[data-minutes]');
const secondsCounterEl = document.querySelector('span[data-seconds]');
buttonEl.disabled = true;
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
let chosenDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    if (chosenDate.getTime() < new Date().getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      buttonEl.disabled = true;
    } else {
      buttonEl.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

buttonEl.addEventListener('click', () => {
  let timeLeftInMs;
  let timeLeft = {};
  function updateTimer() {
    timeLeftInMs = chosenDate.getTime() - new Date().getTime();
    timeLeft = convertMs(timeLeftInMs);
    daysCounterEl.innerText = addLeadingZero(timeLeft.days.toString());
    hoursCounterEl.innerText = addLeadingZero(timeLeft.hours.toString());
    minutesCounterEl.innerText = addLeadingZero(timeLeft.minutes.toString());
    secondsCounterEl.innerText = addLeadingZero(timeLeft.seconds.toString());
  }
  inputEl.disabled = true;
  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    Notiflix.Notify.success('Here we are!');
  }, timeLeftInMs);
});
