import Accordion from 'accordion-js';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

document.querySelectorAll('.certificate-item').forEach(img => {
  img.addEventListener('click', () => {
    const src = img.dataset.full;

    console.log(src); //./img/education/goit-1.png

    const instance = basicLightbox.create(`
      <img src="${src}" alt="certificate" width="200" height="200" />
      `);

    instance.show();
  });
});

// import 'accordion-js/dist/accordion.min.css';
const educationAccordion = new Accordion('.education-accordion-container', {
  duration: 400,
  showMultiple: true,
  openOnInit: [0],
  elementClass: 'education-accordion-item',
  triggerClass: 'block-education',
  panelClass: 'education-accordion-panel',
});
