import Accordion from 'accordion-js';

// import 'accordion-js/dist/accordion.min.css';
const educationAccordion = new Accordion('.education-accordion-container', {
  duration: 400,
  showMultiple: true,
  openOnInit: [0],
  elementClass: 'education-accordion-item',
  triggerClass: 'block-education',
  panelClass: 'education-accordion-panel',
});
