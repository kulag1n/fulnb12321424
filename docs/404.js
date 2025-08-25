<script>
(function () {
  // Перенаправление при ошибке загрузки ресурсов
  window.addEventListener('error', function (e) {
    if (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK' || e.target.tagName === 'IMG') {
      console.warn('Ошибка загрузки ресурса:', e.target.src || e.target.href);
      window.location.href = '/404.html';
    }
  }, true);

  // Перенаправление при JS-ошибке
  window.onerror = function (message, source, lineno, colno, error) {
    console.error('Ошибка JS:', message);
    window.location.href = '/404.html';
  };

  // Проверка доступности API (если используется)
  async function checkAPI() {
    try {
      const response = await fetch('/api/status', { method: 'GET' });
      if (!response.ok) throw new Error('API недоступен');
    } catch (err) {
      console.error('Ошибка API:', err);
      window.location.href = '/404.html';
    }
  }

  // Запуск проверки API через 3 секунды
  setTimeout(checkAPI, 3000);
})();
</script>
