// /max-telegram.js
document.addEventListener('DOMContentLoaded', function () {
  function setupToggle(el) {
    if(!el) return;
    let expanded = false;
    let lastClick = 0;
    const WINDOW = 3500; // мс — окно для второго клика

    // старт — collapsed
    el.classList.add('collapsed');
    el.setAttribute('aria-expanded','false');

    el.addEventListener('click', function(e){
      const now = Date.now();

      if(!expanded){
        e.preventDefault();
        el.classList.remove('collapsed');
        el.classList.add('expanded');
        el.setAttribute('aria-expanded','true');
        expanded = true;
        lastClick = now;
        return;
      }

      if(expanded && (now - lastClick) <= WINDOW){
        // второй клик — открываем ссылку в новой вкладке
        e.preventDefault();
        const href = el.getAttribute('href');
        if(href) window.open(href, '_blank', 'noopener,noreferrer');
        // сворачиваем
        setTimeout(function(){
          el.classList.remove('expanded');
          el.classList.add('collapsed');
          el.setAttribute('aria-expanded','false');
          expanded = false;
        }, 200);
        return;
      }

      // если прошло много времени — считаем как новый первый клик
      e.preventDefault();
      el.classList.remove('collapsed');
      el.classList.add('expanded');
      el.setAttribute('aria-expanded','true');
      expanded = true;
      lastClick = now;
    });

    // клик вне элемента — сворачиваем
    document.addEventListener('click', function(e){
      if(!el.contains(e.target)){
        el.classList.remove('expanded');
        el.classList.add('collapsed');
        el.setAttribute('aria-expanded','false');
        expanded = false;
      }
    });

    // Escape — сворачиваем
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' || e.key === 'Esc'){
        el.classList.remove('expanded');
        el.classList.add('collapsed');
        el.setAttribute('aria-expanded','false');
        expanded = false;
      }
    });
  }

  setupToggle(document.getElementById('btn-max'));
  setupToggle(document.getElementById('btn-tg'));
});
