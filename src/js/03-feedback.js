import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateMessageOutput();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  const message = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, message);
}

function printConsole() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(JSON.parse(savedMessage));
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  printConsole();

  //reset form items
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateMessageOutput() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  // if savesMessage !== null
  if (savedMessage) {
    const data = JSON.parse(savedMessage);

    if (data.email) {
      refs.mail.value = data.email;
    }
    if (data.message) {
      refs.textarea.value = data.message;
    }
  }
}
