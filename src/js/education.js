import Accordion from 'accordion-js';

// certificates.js
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import edu1 from '../img/education/edu-decst-1.png';
import edu2 from '../img/education/edu-decst-2.png';
import edu3 from '../img/education/edu-decst-3.png';
import edu4 from '../img/education/edu-decst-4.png';

const images = {
  1: edu1,
  2: edu2,
  3: edu3,
  4: edu4,
};

document.querySelectorAll('.certificate-item').forEach(img => {
  const id = img.dataset.id;
  img.src = images[id];
  img.dataset.full = images[id];

  img.addEventListener('click', () => {
    const src = img.dataset.full;
    const instance = basicLightbox.create(`
      <img src="${src}" alt="certificate" />
    `);
    instance.show();
  });
});

const educationAccordion = new Accordion('.education-accordion-container', {
  duration: 400,
  showMultiple: true,
  openOnInit: [0],
  elementClass: 'education-accordion-item',
  triggerClass: 'block-education',
  panelClass: 'education-accordion-panel',
});
