document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navContainers = document.querySelectorAll('.nav-links');

  // Бургер
  toggleBtn?.addEventListener('click', () => {
    // Если контейнеров несколько, активируешь нужный визуально (обычно один)
    navContainers.forEach(c => c.classList.toggle('active'));
  });

  // Делегирование кликов по каждому контейнеру меню
  navContainers.forEach(container => {
    container.addEventListener('click', function(e) {
      const link = e.target.closest('li.dropdown > a');
      if (!link || !container.contains(link)) return;

      // Всегда предотвращаем навигацию для пунктов с подменю
      e.preventDefault();

      const item = link.closest('li.dropdown');

      // Закрываем других соседей только в этом контейнере
      container.querySelectorAll('li.dropdown.open').forEach(el => {
        if (el !== item) el.classList.remove('open');
      });

      // Переключаем текущее
      item.classList.toggle('open');
    });
  });

  // Клик вне любого меню — закрыть всё
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-links')) {
      document.querySelectorAll('li.dropdown.open').forEach(el => el.classList.remove('open'));
    }
  });

  // Опционально: при ресайзе убираем мобильное состояние
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      document.querySelectorAll('.nav-links.active').forEach(c => c.classList.remove('active'));
    }
  });
});


