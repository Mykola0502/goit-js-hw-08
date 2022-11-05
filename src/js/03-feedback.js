// 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт
//    з полями email і message, у яких зберігай поточні значення полів форми.
//    Нехай ключем для сховища буде рядок "feedback-form-state".
// 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є
//   збережені дані, заповнюй ними поля форми.В іншому випадку поля повинні
//   бути порожніми.
// 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у
//    консоль об'єкт з полями email, message та їхніми поточними значеннями.
// 4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
//    Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';
// const throttle = require('lodash.throttle');
import '../css/03-feedback.css';
import '../css/common.css';

/**
 *      По прикладу Олександра Репети
 */

// const STORAGE_KEY = 'feedback-form-state';

// const refs = {
//   form: document.querySelector('.feedback-form'),
//   input: document.querySelector('.feedback-form  input'),
//   textarea: document.querySelector('.feedback-form  textarea'),
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.form.addEventListener('input', throttle(onFormInput, 500));

// let formData = {};

// populateForm();

// function onFormInput(evt) {
//   formData[evt.target.name] = evt.target.value;

//   console.log(formData);

//   const stringFormData = JSON.stringify(formData);

//   localStorage.setItem(STORAGE_KEY, stringFormData);
// }

// function populateForm() {
//   const savedstringFormData = localStorage.getItem(STORAGE_KEY);

//   //   console.log(formData);

//   if (savedstringFormData) {
//     formData = JSON.parse(savedstringFormData);
//     refs.input.value = formData.email || '';
//     refs.textarea.value = formData.message || '';
//   }
// }

// function onFormSubmit(evt) {
//   evt.preventDefault();

//   console.log('Відправляємо форму');
//   console.log(formData);
//   evt.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }

/**
 *     Інший спосіб
 */

// const formEl = document.querySelector('.feedback-form');

// formEl.addEventListener('input', throttle(onFormInput, 500));
// formEl.addEventListener('submit', onFormSubmit);

// const STORAGE_KEY = 'feedback-form-state';
// let formData = {};

// populateForm();

// function onFormInput(evt) {
//   formData.email = formEl.elements.email.value;
//   formData.message = formEl.elements.message.value;

//   console.log(formData);

//   const stringFormData = JSON.stringify(formData);

//   localStorage.setItem(STORAGE_KEY, stringFormData);
// }

// function populateForm() {
//   const savedstringFormData = localStorage.getItem(STORAGE_KEY);
//   console.log(savedstringFormData);

//   if (savedstringFormData) {
//     formData = JSON.parse(savedstringFormData || {});
//     console.log(formData);
//     formEl.elements.email.value = formData.email;
//     formEl.elements.message.value = formData.message;
//   }
// }

// function onFormSubmit(evt) {
//   evt.preventDefault();

//   console.log('Відправляємо форму');
//   console.log(formData);
//   evt.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }

/**
 *        Варіант із деструктуризацією та заміною об'єкта
 */

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
const {
  elements: { email, message },
} = formEl;

populateForm();

function onFormInput(evt) {
  formData.email = email.value;
  formData.message = message.value;

  //   console.log(formData);

  const stringFormData = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, stringFormData);
}

function populateForm() {
  const savedstringFormData = localStorage.getItem(STORAGE_KEY);
  //   console.log(savedstringFormData);

  if (savedstringFormData) {
    formData = JSON.parse(savedstringFormData);
    console.log(formData);
    email.value = formData.email;
    message.value = formData.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('Відправляємо форму');
  console.log(formData);

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
