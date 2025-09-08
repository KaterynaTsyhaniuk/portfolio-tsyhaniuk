// async function initI18n() {
//   await i18next.init({
//     lng: 'en', // мова за замовчуванням
//     debug: true,
//     resources: {
//       en: {
//         translation: await fetch('../locales/en.json').then(res => res.json()),
//       },
//       uk: {
//         translation: await fetch('../locales/uk.json').then(res => res.json()),
//       },
//     },
//   });

//   // завантаження збереженої мови
//   const savedLang = localStorage.getItem('lang') || 'en';
//   await i18next.changeLanguage(savedLang);

//   updateContent();
// }

// function updateContent() {
//   document.querySelectorAll('[data-i18n]').forEach(elem => {
//     const key = elem.getAttribute('data-i18n');
//     elem.innerHTML = i18next.t(key);
//   });
// }

// function changeLanguage(lang) {
//   i18next.changeLanguage(lang, updateContent);
//   localStorage.setItem('lang', lang);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   document
//     .getElementById('lang-en')
//     ?.addEventListener('click', () => changeLanguage('en'));

//   document
//     .getElementById('lang-uk')
//     ?.addEventListener('click', () => changeLanguage('uk'));
// });

// initI18n();

// window.changeLanguage = changeLanguage;

import i18next from 'i18next';

async function initI18n() {
  await i18next.init({
    lng: localStorage.getItem('lang') || 'en', // мова за замовчуванням
    debug: true,
    resources: {
      en: {
        translation: await fetch('../locales/en.json').then(res => res.json()),
      },
      uk: {
        translation: await fetch('../locales/uk.json').then(res => res.json()),
      },
    },
  });

  updateContent();
}

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.innerHTML = i18next.t(key); // вставляє HTML зі span-ами і стилями
  });
}

function changeLanguage(lang) {
  i18next.changeLanguage(lang).then(() => {
    localStorage.setItem('lang', lang);
    updateContent();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('lang-en')
    ?.addEventListener('click', () => changeLanguage('en'));
  document
    .getElementById('lang-uk')
    ?.addEventListener('click', () => changeLanguage('uk'));
});

initI18n();
