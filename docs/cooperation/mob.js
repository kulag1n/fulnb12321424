<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Бургер — показывает/скрывает общий список ссылок
  toggleBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
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

  // === МОДАЛЬНОЕ ОКНО "Форма партнёрства" ===
  const openBtn = document.getElementById('openModal');
  const modal = document.getElementById('modalForm');
  const closeBtn = document.getElementById('closeModal');

  if (openBtn && modal) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (modal.style.display === 'flex') {
        modal.style.display = 'none'; // закрыть
      } else {
        modal.style.display = 'flex'; // открыть
      }
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Закрытие по клику вне формы
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
</script>
