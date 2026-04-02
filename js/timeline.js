/* ============================================
   MARENTROPICO — Timeline Engine
   Depends on: media-embed.js
   ============================================ */

class Timeline {
  constructor(data) {
    this.eras = data.eras;
    this.currentEra = 0;
    this.init();
  }

  init() {
    this.renderNav();
    this.renderStage();
    this.activateEra(0);
    this.bindKeyboard();
    this.bindSwipe();
  }

  renderNav() {
    const nav = document.getElementById('era-nav');
    if (!nav) return;

    this.eras.forEach((era, i) => {
      const btn = document.createElement('button');
      btn.className = 'era-tab';
      btn.setAttribute('data-era', i);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', `Era ${era.label}: ${era.period}`);
      btn.innerHTML = `
        <span class="era-tab-icon" aria-hidden="true">${era.icon}</span>
        <span class="era-tab-label">${era.label}</span>
        <span class="era-tab-period">${era.period}</span>
      `;
      btn.addEventListener('click', () => this.activateEra(i));
      nav.appendChild(btn);
    });
  }

  renderStage() {
    const stage = document.getElementById('era-stage');
    if (!stage) return;

    this.eras.forEach((era, i) => {
      const panel = document.createElement('div');
      panel.className = 'era-panel';
      panel.id = `era-panel-${i}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', 'true');

      panel.innerHTML = `
        <div class="era-panel-inner">
          <div class="era-info">
            <div class="era-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
            <h3 class="era-title">${era.title}</h3>
            <div class="era-color-bar" style="background:${era.color}" aria-hidden="true"></div>
            <p class="era-description">${era.description}</p>
            <nav class="era-progress" aria-label="Navegar entre eras">
              ${this.eras.map((e, j) => `
                <div class="era-dot${j === i ? ' active' : ''}"
                     data-goto="${j}"
                     role="button"
                     tabindex="0"
                     aria-label="Ir para: ${e.label}"></div>
              `).join('')}
            </nav>
          </div>
          <div class="milestones-column" id="milestones-${i}">
            ${this.renderMilestones(era)}
          </div>
        </div>
        ${i < this.eras.length - 1 ? `
          <div class="era-next-wrap">
            <button class="era-next-btn" data-next="${i + 1}" aria-label="Próxima era: ${this.eras[i + 1].label}">
              <span class="era-next-label">Próximo Marco</span>
              <span class="era-next-name">${this.eras[i + 1].icon} ${this.eras[i + 1].label}</span>
              <svg class="era-next-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        ` : `
          <div class="era-next-wrap">
            <button class="era-next-btn era-next-btn--end" data-next="0" aria-label="Voltar ao início da jornada">
              <span class="era-next-label">Fim da Jornada</span>
              <span class="era-next-name">↑ Voltar ao início</span>
            </button>
          </div>
        `}
      `;

      panel.querySelectorAll('.era-dot').forEach(dot => {
        const target = parseInt(dot.dataset.goto);
        dot.addEventListener('click', () => this.activateEra(target));
        dot.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.activateEra(target);
          }
        });
      });

      // Próximo Marco button
      const nextBtn = panel.querySelector('.era-next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          const next = parseInt(nextBtn.dataset.next);
          this.activateEra(next);
          // Scroll so the top of #era-nav aligns with the top of the viewport
          const eraNav = document.getElementById('era-nav');
          if (eraNav) {
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const top = eraNav.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        });
      }

      stage.appendChild(panel);
    });
  }

  renderMilestones(era) {
    if (!era.milestones || era.milestones.length === 0) {
      return `
        <div class="milestone-empty">
          <p>
            <strong>// Marco a adicionar</strong>
            Edite <code>data/timeline.json</code> para incluir os marcos desta era.
          </p>
        </div>`;
    }
    return era.milestones.map((m, j) => this.renderMilestone(m, j)).join('');
  }

  renderMilestone(m, index) {
    const typeLabel  = { youtube: 'Vídeo', spotify: 'Música', photo: 'Foto', text: 'Marco', milestone: 'Evento' };
    const badgeClass = { youtube: 'badge-video', spotify: 'badge-music', photo: 'badge-photo', text: 'badge-text', milestone: 'badge-milestone' };

    const mediaHTML = MediaEmbed.buildMediaHTML(m);

    return `
      <article class="milestone-card" style="transition-delay:${index * 0.1}s" aria-label="${m.title}">
        <div class="milestone-header">
          <div class="milestone-meta">
            <span class="milestone-type-badge ${badgeClass[m.type] || 'badge-milestone'}">
              ${typeLabel[m.type] || 'Marco'}
            </span>
            <span class="milestone-date">${m.date || ''}</span>
          </div>
          <h4 class="milestone-title">${m.title}</h4>
        </div>
        ${mediaHTML}
        ${m.description ? `<div class="milestone-body"><p class="milestone-desc">${m.description}</p></div>` : ''}
      </article>`;
  }

  activateEra(index) {
    if (index < 0 || index >= this.eras.length) return;
    this.currentEra = index;

    document.querySelectorAll('.era-tab').forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Scroll active tab into view horizontally — só mexe o nav, nunca a página
    const activeTab = document.querySelector(`.era-tab[data-era="${index}"]`);
    const nav = document.getElementById('era-nav');
    if (activeTab && nav) {
      const tabLeft   = activeTab.offsetLeft;
      const tabWidth  = activeTab.offsetWidth;
      const navWidth  = nav.offsetWidth;
      const scrollTo  = tabLeft - (navWidth / 2) + (tabWidth / 2);
      nav.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }

    document.querySelectorAll('.era-panel').forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle('active', active);
      panel.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    setTimeout(() => {
      document.querySelectorAll(`#milestones-${index} .milestone-card`)
        .forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 120);
        });
    }, 80);
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      const section = document.getElementById('timeline');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      if (e.key === 'ArrowRight') this.activateEra(this.currentEra + 1);
      if (e.key === 'ArrowLeft')  this.activateEra(this.currentEra - 1);
    });
  }

  bindSwipe() {
    const stage = document.getElementById('era-stage');
    if (!stage) return;
    let startX = 0;
    stage.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return;
      if (diff > 0) this.activateEra(this.currentEra + 1);
      else          this.activateEra(this.currentEra - 1);
    }, { passive: true });
  }
}

// ============ BOOTSTRAP ============

function bootTimeline(data) {
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('hero-name',     data.identity.alias);
  setEl('hero-subtitle', data.identity.roles.join('  ·  '));
  setEl('hero-essence',  data.identity.essence);
  setEl('about-bio',     data.identity.bio);

  const heroRoles = document.getElementById('hero-roles');
  if (heroRoles) {
    heroRoles.innerHTML = data.identity.roles
      .map(r => `<span class="role-pill">${r}</span>`)
      .join('');
  }

  const valuesGrid = document.getElementById('values-grid');
  if (valuesGrid) {
    valuesGrid.innerHTML = data.values.map((v, i) => `
      <div class="value-card reveal reveal-delay-${i + 1}">
        <div class="value-icon">${v.icon}</div>
        <h4>${v.label}</h4>
        <p>${v.text}</p>
      </div>
    `).join('');
  }

  new Timeline(data);

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 }).observe(el);
  });
}

// ============ LOAD STRATEGY ============
// 1. fetch() — funciona em servidor (GitHub Pages, npx serve, python http.server)
// 2. window.__TIMELINE_DATA — fallback inline para abrir via file://

async function initTimeline() {
  try {
    const res = await fetch('./data/timeline.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    bootTimeline(data);
  } catch (fetchErr) {
    if (window.__TIMELINE_DATA) {
      console.info('[Timeline] Usando dados inline (modo file://).');
      bootTimeline(window.__TIMELINE_DATA);
    } else {
      console.error('[Timeline] Falha ao carregar dados:', fetchErr);
      const stage = document.getElementById('era-stage');
      if (stage) {
        stage.innerHTML = `
          <div style="padding:2rem 1rem;text-align:center;color:#8A8472;font-family:monospace;font-size:.8rem;line-height:2">
            Para visualizar localmente, rode um servidor na pasta do projeto:<br>
            <code style="color:#C4622D">npx serve .</code>
            &nbsp;&nbsp;ou&nbsp;&nbsp;
            <code style="color:#C4622D">python3 -m http.server</code>
          </div>`;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', initTimeline);