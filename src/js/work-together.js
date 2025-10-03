'use strict';
import axios from 'axios';
import i18next from 'i18next';
import { saveToLS, loadFromLS } from './storage.js';

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

  if (emailValue === '' || !refs.inputMailElem.validity.valid) {
    createErrorMailNotification();
    isValid = false;
  } else {
    createMailSuccessNotification();
  }

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
    const markup = modalTemplate();
    refs.contentBoxModalElem.insertAdjacentHTML('afterbegin', markup);
    hideLoader();
    refs.backDropElem.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    event.target.reset();
    localStorage.removeItem('email');
    localStorage.removeItem('comments');
  } catch (err) {
    console.error(err);
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
    const res = await axios.post('https://api.web3forms.com/submit', {
      access_key: '464ab86e-12e0-4fe0-aef5-2d53cc2e0713',
      subject: 'New Form Submission',
      from_name: 'Contact Form',
      email: data.email,
      message: `Email: ${data.email}\nComment: ${data.comment}`,
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// function modalTemplate() {
//   return `<h2 class="footer-modal-title" data-i18n="work-together.footer-title">
//       Thank you!
//     </h2>
//     <p class="footer-modal-text" data-i18n="work-together.footer-text">
//       Your message already flew into my private messages! I'll reply soon!
//     </p>`;
// }

function modalTemplate() {
  return `
    <h2 class="footer-modal-title">
      ${i18next.t('work-together.footer-title')}
    </h2>
    <p class="footer-modal-text">
      ${i18next.t('work-together.footer-text')}
    </p>
  `;
}

function clearNotificationField() {
  refs.spanValidMailElem.textContent = '';
  refs.spanValidCommentElem.textContent = '';
  refs.inputMailElem.classList.remove('input-success');
  refs.spanValidMailElem.classList.remove('notification-success');
  refs.inputCommentElem.classList.remove('input-success');
  refs.spanValidCommentElem.classList.remove('notification-success');
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
  refs.spanValidMailElem.textContent = i18next.t('errors.invalidEmail');
}

function createErrorCommentNotification() {
  refs.inputCommentElem.classList.add('input-error');
  refs.spanValidCommentElem.classList.add('notification-error');
  refs.spanValidCommentElem.textContent = i18next.t('errors.emptyComment');
}

function createCommentSuccessNotification() {
  refs.inputCommentElem.classList.remove('input-error');
  refs.spanValidCommentElem.classList.remove('notification-error');
  refs.inputCommentElem.classList.add('input-success');
  refs.spanValidCommentElem.textContent = i18next.t(
    'success.validEmailComment'
  );
}

function createMailSuccessNotification() {
  refs.inputMailElem.classList.remove('input-error');
  refs.spanValidMailElem.classList.remove('notification-error');
  refs.inputMailElem.classList.add('input-success');
  refs.spanValidMailElem.textContent = i18next.t('success.validEmailComment');
}

function showLoader() {
  refs.loaderWrapElem.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loaderWrapElem.classList.add('is-hidden');
}
