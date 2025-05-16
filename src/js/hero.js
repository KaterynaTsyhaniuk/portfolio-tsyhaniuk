document.addEventListener('DOMContentLoaded', () => {
  const firstHeaderSpan = document.querySelector('.title-first');
  const secondHeaderSpan = document.querySelector('.title-second');
  const thirdHeaderSpan = document.querySelector('.title-third');
  const socialList = document.querySelector('.social-list');

  firstHeaderSpan.classList.add('hero-title-visible');
  secondHeaderSpan.classList.add('hero-title-visible');
  thirdHeaderSpan.classList.add('hero-title-visible');
  socialList.classList.add('hero-title-visible');
});
