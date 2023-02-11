import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

// let formData;
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

loadForm();

function onFormInput(event) {
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  formData[event.target.name] = event.target.value;
  const message = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, message);
}

function getLocalStorege() {
  return localStorage.getItem(STORAGE_KEY);
}

function printConsole() {
  //   const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (getLocalStorege()) {
    console.log(JSON.parse(getLocalStorege()));
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  printConsole();
  //reset form items
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function loadForm() {
  // if savesMessage !== null
  const data = JSON.parse(getLocalStorege());
  if (getLocalStorege()) {
    refs.mail.value = data.email || '';

    // if (data.email) {
    //   refs.mail.value = data.email;
    // }
    // if (data.message) {
    //   refs.textarea.value = data.message;
    // }

    refs.textarea.value = data.message || '';
  }
}
