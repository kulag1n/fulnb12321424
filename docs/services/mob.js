document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navContacts = document.querySelector('.nav-contacts');

  // Бургер — показывает/скрывает меню и контакты
  toggleBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    navContacts?.classList.toggle('active');
  });

  // Делегирование кликов по пунктам с подменю
  navLinks?.addEventListener('click', function(e) {
    const link = e.target.closest('.dropdown > a');
    if (!link) return;

    // На мобильных и для href="#" не даём навигации
    const isHash = link.getAttribute('href') === '#';
    if (isHash || window.innerWidth <= 1024) {
      e.preventDefault();
    }

    const li = link.parentElement;

    // Переключаем текущее
    const isOpen = li.classList.contains('open');
    // Закрываем соседние открытые в этом же списке
    Array.from(li.parentElement.children).forEach(sibling => {
      if (sibling !== li && sibling.classList?.contains('open')) {
        sibling.classList.remove('open');
      }
    });
    // Тогглим текущее
    li.classList.toggle('open', !isOpen);
  });

  // Клик вне dropdown — закрывает подменю
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(li => li.classList.remove('open'));
    }
  });
});
