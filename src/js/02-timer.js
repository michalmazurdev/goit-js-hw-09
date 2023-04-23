import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputEl = document.getElementById('datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
buttonEl.disabled = true;
function addLeadingZero(value) {
  if (value.length <= 2) {
    value.padStart(2, '0');
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
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
    if (chosenDate.getTime() <= new Date().getTime()) {
      window.alert('Please choose a date in the future');
      buttonEl.disabled = true;
    } else {
      buttonEl.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

buttonEl.addEventListener('click', () => {
  let timeLeft = {};
  function updateTimer() {
    timeLeft = convertMs(chosenDate.getTime() - new Date().getTime());
    document.querySelector('span[data-days]').innerText =
      timeLeft.days.toString();

    console.log(`${timeLeft.days}`);
    console.log(typeof `${timeLeft.days}`);
    console.log('2'.length);
    console.log('2'.padStart(2, '0'));

    document.querySelector('span[data-hours]').innerText = timeLeft.hours;
    document.querySelector('span[data-minutes]').innerText = timeLeft.minutes;
    document.querySelector('span[data-seconds]').innerText = timeLeft.seconds;
  }
  inputEl.disabled = true;
  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, chosenDate.getTime() - new Date().getTime());
});
