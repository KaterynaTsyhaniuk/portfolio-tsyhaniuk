document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-btn');
  const menuClose = document.querySelector('.mobile-menu-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');

  function openMenu() {
    mobileMenu.classList.add('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('menu-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});

function checkScreenWidth() {
  const screenWidth = window.innerWidth;
  const mobileMenu = document.querySelector('#mobile-menu');
  if (screenWidth >= 768 && mobileMenu.classList.contains('menu-open')) {
    mobileMenu.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
}
window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);
