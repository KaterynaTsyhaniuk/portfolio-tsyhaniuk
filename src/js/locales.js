import i18next from 'i18next';

async function initI18n() {
  const en = await fetch('/locales/en.json').then(res => res.json());
  const uk = await fetch('/locales/uk.json').then(res => res.json());

  await i18next.init({
    lng: localStorage.getItem('lang') || 'en',
    debug: true,
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
  });

  updateContent();
}

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.innerHTML = i18next.t(key);
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
