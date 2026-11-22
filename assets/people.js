/* LALIET — perfis de equipe, membros e colaboradores, lidos de data/pessoas.json.
   Grupos: "pessoas" (coordenação e pesquisadores), "membros" e "colaboradores". */
(() => {
  'use strict';
  const root = document.getElementById('people-root');
  if (!root) return;

  const GROUPS = [
    { key: 'pessoas', title: 'Coordenação e pesquisadores', hint: 'Equipe responsável pelas linhas de pesquisa' },
    { key: 'membros', title: 'Membros', hint: 'Estudantes, bolsistas e participantes do laboratório',
      empty: 'Os membros do laboratório — estudantes, bolsistas e pesquisadores associados — serão apresentados aqui à medida que integrarem as atividades.' },
    { key: 'colaboradores', title: 'Colaboradores', hint: 'Parceiros de outras instituições e comunidades',
      empty: 'Colaboradores externos, instituições e parceiros das comunidades serão apresentados aqui, com sua autorização.' }
  ];

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const initials = name => name.replace(/^(Dra?\.|Prof\.?a?|Me\.|Ma\.)\s+/i, '')
    .split(/\s+/).filter(w => w.length > 2 || /^[A-ZÀ-Ý]/.test(w))
    .filter(w => !/^(de|da|do|dos|das|di|e)$/i.test(w))
    .map(w => w[0]).filter(Boolean);
  const icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>';

  function card(p) {
    const art = el('article', 'person reveal');
    const pic = el('div', 'portrait');
    if (p.foto) {
      const img = el('img');
      img.src = p.foto; img.alt = 'Fotografia de ' + p.nome; img.loading = 'lazy';
      img.width = 720; img.height = 960;
      pic.append(img);
    } else {
      const ini = initials(p.nome);
      const s = el('div', 'initials', (ini[0] || '') + (ini.length > 1 ? ini[ini.length - 1] : ''));
      s.setAttribute('aria-hidden', 'true');
      pic.append(s);
    }
    const body = el('div', 'body');
    body.append(el('span', 'role', p.funcao || 'Colaborador(a)'), el('h4', '', p.nome));
    if (p.instituicao) body.append(el('p', 'inst', p.instituicao));
    if (p.biografia) {
      const bio = el('p', 'bio', p.biografia);
      body.append(bio);
      if (p.biografia.length > 260) {
        bio.classList.add('clamp');
        const more = el('button', 'more', 'Ler mais');
        more.type = 'button';
        more.setAttribute('aria-expanded', 'false');
        more.addEventListener('click', () => {
          const open = bio.classList.toggle('clamp') === false;
          more.textContent = open ? 'Ler menos' : 'Ler mais';
          more.setAttribute('aria-expanded', String(open));
        });
        body.append(more);
      }
    }
    const links = [['lattes', 'Lattes'], ['orcid', 'ORCID'], ['pagina', 'Perfil']].filter(([k]) => p[k]);
    if (links.length) {
      const wrap = el('div', 'plinks');
      for (const [k, label] of links) {
        const a = el('a', 'textlink', label + ' ↗');
        a.href = p[k]; a.target = '_blank'; a.rel = 'noopener noreferrer';
        wrap.append(a);
      }
      body.append(wrap);
    }
    art.append(pic, body);
    return art;
  }

  function render(data) {
    root.replaceChildren();
    for (const g of GROUPS) {
      const list = (data[g.key] || []).filter(p => p && p.nome);
      const sec = el('div', 'group');
      const head = el('div', 'grouphead');
      head.append(el('h3', '', g.title), el('span', '', list.length ? g.hint : 'Em breve'));
      sec.append(head);
      if (list.length) {
        const grid = el('div', 'people');
        list.forEach(p => grid.append(card(p)));
        sec.append(grid);
      } else {
        const box = el('div', 'empty');
        const ic = el('span', 'ic'); ic.innerHTML = icon;
        box.append(ic, el('p', '', g.empty || 'Perfis em preparação.'));
        sec.append(box);
      }
      root.append(sec);
    }
    // ativa animação de entrada nos cartões recém-criados
    requestAnimationFrame(() => root.querySelectorAll('.reveal').forEach(n => n.classList.add('in')));
  }

  fetch('data/pessoas.json')
    .then(r => { if (!r.ok) throw Error(); return r.json(); })
    .then(render)
    .catch(() => { root.textContent = 'Não foi possível carregar os perfis.'; });
})();
