import Accordion from 'accordion-js';

// certificates.js
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// делегуємо клік на документі — працює, навіть якщо елементи з'являються пізніше
document.addEventListener('click', e => {
  const img = e.target.closest('.certificate-item');
  if (!img) return;

  // беремо спочатку data-full (як ти раніше мав), якщо нема — беремо src атрибут
  const raw = img.dataset.full || img.getAttribute('src') || '';

  // якщо це вже повний URL (http(s)...) — повертаємо як є
  if (/^https?:\/\//i.test(raw)) {
    openLightbox(raw);
    return;
  }

  // прибираємо ведучі './' або '/'
  const rel = raw.replace(/^\.?\//, '');

  // BASE_URL під Vite: '/' локально, і '/repo-name/' в проді.
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : '/';

  // коректно з'єднуємо (щоб не було подвійних слешів)
  const src = base.endsWith('/') ? base + rel : base + '/' + rel;

  openLightbox(src);
});

function openLightbox(src) {
  const instance = basicLightbox.create(`
    <img src="${src}" alt="certificate" style="max-width:100%; height:auto; display:block;" />
  `);
  instance.show();
}

const educationAccordion = new Accordion('.education-accordion-container', {
  duration: 400,
  showMultiple: true,
  openOnInit: [0],
  elementClass: 'education-accordion-item',
  triggerClass: 'block-education',
  panelClass: 'education-accordion-panel',
});
