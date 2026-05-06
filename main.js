/* ===========================
   AcumulaPontos — main.js
   =========================== */

// ——— SPLASH SCREEN ———————————————————————————————————————
(function () {
  const splash      = document.getElementById('splash');
  const mainContent = document.getElementById('main-content');

  // Duração do splash em ms (deve bater com a animação da barra CSS ~2s)
  const SPLASH_DURATION = 2400;

  function hideSplash() {
    splash.classList.add('fade-out');

    mainContent.classList.remove('hidden');
    mainContent.classList.add('visible');

    // Remove o splash do DOM após a animação terminar
    splash.addEventListener('animationend', () => {
      splash.remove();
    }, { once: true });
  }

  // Aguarda o carregamento completo da página + duração mínima do splash
  const pageReady  = new Promise(resolve => window.addEventListener('load', resolve));
  const minDelay   = new Promise(resolve => setTimeout(resolve, SPLASH_DURATION));

  Promise.all([pageReady, minDelay]).then(hideSplash);
})();


// ——— CALCULADORA ——————————————————————————————————————————
(function () {
  const gastoInput = document.getElementById('gasto');
  const slider     = document.getElementById('slider');

  if (!gastoInput || !slider) return;

  function atualizar(val) {
    const v   = Math.max(0, parseInt(val) || 0);
    const mes = v;
    const ano = v * 12;
    const eco = (ano * 0.01).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('pts-mes').textContent  = mes.toLocaleString('pt-BR') + ' pts';
    document.getElementById('pts-ano').textContent  = ano.toLocaleString('pt-BR') + ' pts';
    document.getElementById('economia').textContent = eco;
  }

  gastoInput.addEventListener('input', function () {
    slider.value = Math.min(2000, Math.max(50, this.value));
    atualizar(this.value);
  });

  slider.addEventListener('input', function () {
    gastoInput.value = this.value;
    atualizar(this.value);
  });
})();


// ——— FORMULÁRIO DE CADASTRO ———————————————————————————————
(function () {
  const form    = document.getElementById('cta-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.display    = 'none';
    success.style.display = 'flex';
  });
})();


// ——— SMOOTH SCROLL ————————————————————————————————————————
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// ——— NAV: adiciona sombra ao rolar ————————————————————————
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(59,63,158,0.12)'
      : 'none';
  }, { passive: true });
})();
