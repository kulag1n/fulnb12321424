document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Бургер — показать/скрыть меню
  toggleBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Клик по пункту с подменю
  navLinks.addEventListener('click', function (e) {
    const link = e.target.closest('.dropdown > a');
    if (!link) return;

    e.preventDefault(); // не переходим по ссылке

    const li = link.closest('.dropdown');

    // Закрываем все подменю, кроме текущего
    navLinks.querySelectorAll('.dropdown.open').forEach(openLi => {
      if (openLi !== li) openLi.classList.remove('open');
    });

    // Переключаем текущее
    li.classList.toggle('open');
  });

  // Клик вне меню — закрыть всё
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.top-navbar')) {
      navLinks.querySelectorAll('.dropdown.open').forEach(li => li.classList.remove('open'));
    }
  });
});
