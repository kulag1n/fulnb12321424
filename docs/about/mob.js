document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Бургер
  toggleBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
  });

  // Делегирование кликов по подменю
  navLinks?.addEventListener('click', function(e) {
    const link = e.target.closest('.dropdown > a');
    if (!link) return;

    const isHash = link.getAttribute('href') === '#';
    if (isHash || window.innerWidth <= 1024) {
      e.preventDefault();
    }

    const li = link.parentElement;

    // Закрываем соседей
    Array.from(li.parentElement.children).forEach(sibling => {
      if (sibling !== li) {
        sibling.classList.remove('open');
      }
    });

    // Просто переключаем текущее
    li.classList.toggle('open');
  });

  // Клик вне меню
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(li => li.classList.remove('open'));
    }
  });
});

