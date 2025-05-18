document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // знімаємо спостереження після першої появи
        }
      });
    },
    {
      threshold: 0.2, // коли 20% елементу видно
    }
  );

  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach(el => observer.observe(el));
});
