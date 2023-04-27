import Notiflix from 'notiflix';
const formEl = document.querySelector('form');
const delayInputEl = document.querySelector('input[name=delay]');
const stepInputEl = document.querySelector('input[name=step]');
const amountInputEl = document.querySelector('input[name=amount]');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInputEl.value);
  const step = Number(stepInputEl.value);
  const amount = Number(amountInputEl.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
