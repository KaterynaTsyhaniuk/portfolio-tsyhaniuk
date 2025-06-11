'use strict';

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formElem: document.querySelector('.footer-form'),
  inputMailElem: document.querySelector('.footer-form-input-mail'),
  inputCommentElem: document.querySelector('.footer-form-input-text'),
  spanValidMailElem: document.querySelector('.valid-notification-mail'),
  spanValidCommentElem: document.querySelector('.valid-notification-comment'),
  backDropElem: document.querySelector('.footer-backdrop'),
  closeModalElem: document.querySelector('.footer-modal-close-btn'),
  contentBoxModalElem: document.querySelector('.modal-content-box'),
  formSubmitBtnElem: document.querySelector('.form-submit-btn'),
  loaderWrapElem: document.querySelector('.loader-wrap'),
};

refs.formElem.addEventListener('input', e => {
  e.preventDefault();
  checkInputValidity();
  const formData = new FormData(refs.formElem);
  const email = formData.get('email');
  const comments = formData.get('comments');
  saveToLS('email', email);
  saveToLS('comments', comments);
});

window.addEventListener('DOMContentLoaded', e => {
  const email = loadFromLS('email');
  const comments = loadFromLS('comments');
  refs.formElem.elements.email.value = email;
  refs.formElem.elements.comments.value = comments;
});

refs.formElem.addEventListener('submit', async event => {
  event.preventDefault();

  const emailValue = refs.inputMailElem.value.trim();
  const commentValue = refs.inputCommentElem.value.trim();

  let isValid = true;

  // Перевірка email
  if (emailValue === '' || !refs.inputMailElem.validity.valid) {
    createErrorMailNotification();
    isValid = false;
  } else {
    createMailSuccessNotification();
  }

  // Перевірка comments
  if (commentValue === '' || commentValue.length < 10) {
    createErrorCommentNotification();
    isValid = false;
  } else {
    createCommentSuccessNotification();
  }

  if (!isValid) return;

  const userData = { email: emailValue, comment: commentValue };

  clearNotificationField();
  showLoader();

  try {
    const response = await createRequest(userData);
    const markup = modalTemplate(response);
    refs.contentBoxModalElem.insertAdjacentHTML('afterbegin', markup);
    hideLoader();
    refs.backDropElem.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    event.target.reset();
    localStorage.removeItem('email');
    localStorage.removeItem('comments');
  } catch (err) {
    iziToast.error(iziToastErrorObj);
    hideLoader();
  }
});

refs.closeModalElem.addEventListener('click', event => {
  closeModal();
  refs.contentBoxModalElem.innerHTML = '';
});

window.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    closeModal();
    refs.contentBoxModalElem.innerHTML = '';
  }
});
refs.backDropElem.addEventListener('click', event => {
  closeModal();
  refs.contentBoxModalElem.innerHTML = '';
});

function closeModal() {
  refs.backDropElem.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
}

async function createRequest(data) {
  try {
    const res = await axios.post(
      'https://server-tsyhaniuk-1.onrender.com/send-email',
      data
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}
function modalTemplate() {
  return `<h2 class="footer-modal-title">
      Thank you!
    </h2>
    <p class="footer-modal-text">
      Your message already flew into my private messages! I'll reply soon!
    </p>`;
}

function clearNotificationField() {
  refs.spanValidMailElem.textContent = '';
  refs.spanValidCommentElem.textContent = '';
  refs.inputMailElem.classList.remove('input-success');
  refs.spanValidMailElem.classList.remove('notification-success');
  refs.inputCommentElem.classList.remove('input-success');
  refs.spanValidCommentElem.classList.remove('notification-success');
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function checkInputValidity() {
  let isValid = true;

  if (!refs.inputMailElem.validity.valid) {
    createErrorMailNotification();
    isValid = false;
  } else {
    createMailSuccessNotification();
  }

  if (
    !refs.inputCommentElem.validity.valid ||
    refs.inputCommentElem.value.trim().length < 10
  ) {
    createErrorCommentNotification();
    isValid = false;
  } else {
    createCommentSuccessNotification();
  }

  if (isValid) {
    refs.formSubmitBtnElem.removeAttribute('disabled');
  } else {
    refs.formSubmitBtnElem.setAttribute('disabled', '');
  }
}

function createErrorMailNotification() {
  refs.inputMailElem.classList.add('input-error');
  refs.spanValidMailElem.classList.add('notification-error');
  refs.spanValidMailElem.textContent = 'Invalid email,try again';
}

function createErrorCommentNotification() {
  refs.inputCommentElem.classList.add('input-error');
  refs.spanValidCommentElem.classList.add('notification-error');
  refs.spanValidCommentElem.textContent = "Don't leave this field empty.";
}

function createCommentSuccessNotification() {
  refs.inputCommentElem.classList.remove('input-error');
  refs.spanValidCommentElem.classList.remove('notification-error');
  refs.inputCommentElem.classList.add('input-success');
  refs.spanValidCommentElem.textContent = 'Success!';
}

function createMailSuccessNotification() {
  refs.inputMailElem.classList.remove('input-error');
  refs.spanValidMailElem.classList.remove('notification-error');
  refs.inputMailElem.classList.add('input-success');
  refs.spanValidMailElem.textContent = 'Success!';
}

const iziToastErrorObj = {
  title: 'Error',
  message: `Sorry, something went wrong...`,
  backgroundColor: 'rgb(224, 55, 63)',
  titleColor: 'rgb(255, 255, 255)',
  messageColor: 'rgb(255, 255, 255)',
  messageSize: '16',
  iconColor: 'rgb(255, 255, 255)',
  theme: 'dark',
  progressBarColor: 'rgb(255, 255, 255)',
  position: 'bottomCenter',
};

function showLoader() {
  refs.loaderWrapElem.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loaderWrapElem.classList.add('is-hidden');
}
