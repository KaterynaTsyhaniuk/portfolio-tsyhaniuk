document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.back-to-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if (scrolled > 350) {
      document
        .querySelector('.back-to-top-btn')
        .classList.add('back-to-top-btn-active');
    } else {
      document
        .querySelector('.back-to-top-btn')
        .classList.remove('back-to-top-btn-active');
    }
  });
});
