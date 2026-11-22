/* LALIET — comportamento comum: menu, cabeçalho, animações de entrada, copiar citação. */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const nav = document.querySelector('.nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const btn = document.querySelector('.menu-btn');
  const links = document.getElementById('navlinks');
  if (btn && links) {
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Fechar' : 'Menu';
    });
    links.addEventListener('click', e => {
      if (e.target.closest('a') && links.classList.contains('open')) btn.click();
    });
  }

  // Animação de entrada (respeita prefers-reduced-motion via CSS)
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const en of entries) if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  // Botões "Copiar" de citações
  document.querySelectorAll('[data-copy]').forEach(b => {
    b.addEventListener('click', async () => {
      const target = document.getElementById(b.dataset.copy);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        const old = b.textContent; b.textContent = 'Copiado ✓';
        setTimeout(() => (b.textContent = old), 1800);
      } catch { /* navegador sem permissão de área de transferência */ }
    });
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
