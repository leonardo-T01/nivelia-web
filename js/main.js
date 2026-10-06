// js/main.js - NIVELIA S.A.S. Interactive UI Controller v3.0
// Incluye: Menú Hamburguesa Móvil + Interactividad General

document.addEventListener('DOMContentLoaded', () => {

  // ============ 0. MENÚ HAMBURGUESA MÓVIL ⭐ NUEVO ============
  const menuToggle = document.getElementById('menu-toggle');
  const navContainer = document.getElementById('nav-container');

  console.log('🔍 Menú:', {
    toggle: menuToggle ? '✅' : '❌',
    nav: navContainer ? '✅' : '❌'
  });

  if (menuToggle && navContainer) {

    // Función para abrir/cerrar
    function toggleMenu() {
      const isOpening = !navContainer.classList.contains('active');
      menuToggle.classList.toggle('active');
      navContainer.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
      document.body.style.overflow = isOpening ? 'hidden' : '';
      console.log('🍔 Menú:', isOpening ? 'ABIERTO' : 'CERRADO');
    }

    // Función para cerrar
    function closeMenu() {
      menuToggle.classList.remove('active');
      navContainer.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    // 1. Click en el botón hamburguesa
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // 2. Cerrar al hacer click en un enlace
    navContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // 3. Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (navContainer.classList.contains('active') &&
          !navContainer.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // 4. Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // 5. Cerrar al redimensionar a desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 968) closeMenu();
    });

    console.log('✅ Menú hamburguesa inicializado');
  } else {
    console.warn('⚠️ No se encontró el menú hamburguesa. Verifica el HTML.');
  }

  // ============ 1. DETECCIÓN AUTOMÁTICA DEL MENÚ ACTIVO ============
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
    else link.classList.remove('active');
  });

  // ============ 2. CONTROL DE PESTAÑAS INTERACTIVAS (TABS) ============
  document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const tabGroup = button.closest('.tabs-container');
      if (!tabGroup) return;
      const targetId = button.getAttribute('data-tab');
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      button.classList.add('active');
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });

  // ============ 3. ACORDEONES ============
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => header.parentElement.classList.toggle('active'));
  });

  // ============ 4. FALLBACK DE IMÁGENES ============
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (this.classList.contains('logo-img')) this.style.display = 'none';
      else {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'img-fallback';
        fallback.innerHTML = '📊 Diagrama no disponible — Consulte el documento NIV-ORG-001';
        this.parentElement.appendChild(fallback);
      }
    });
  });

  // ============ 5. RENDERIZADO DE CARGOS (solo en cargos.html) ============
  if (document.getElementById('cargos-grid') && typeof CARGOS_DATA !== 'undefined') {
    renderCargos(CARGOS_DATA);
    document.getElementById('total-cargos').textContent = CARGOS_DATA.length;

    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filtro = btn.getAttribute('data-filtro');
        const filtrados = filtro === 'all' ? CARGOS_DATA : CARGOS_DATA.filter(c => c.area.includes(filtro));
        renderCargos(filtrados);
      });
    });
  }
});

// === RENDERIZADO DE CARGOS ===
function renderCargos(cargos) {
  const grid = document.getElementById('cargos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (cargos.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">No hay cargos en esta categoría.</p>';
    return;
  }

  cargos.forEach((c) => {
    const card = document.createElement('div');
    card.className = 'cargo-card';
    card.setAttribute('data-index', CARGOS_DATA.indexOf(c));
    card.innerHTML = `
      <div class="cargo-codigo">${c.codigo}</div>
      <div class="cargo-nombre">${c.cargo}</div>
      <div class="cargo-area">${c.area} · ${c.nivel}</div>
      <div class="cargo-proposito">${c.proposito}</div>
      <div style="margin-top: auto; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <span class="badge badge-cyan" style="font-size: 0.65rem;">${c.nivel}</span>
      </div>
    `;
    card.addEventListener('click', () => abrirModal(c));
    grid.appendChild(card);
  });
}

// === MODAL DE PERFIL ===
function abrirModal(c) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body');
  if (!overlay || !body) return;

  const listaFunciones = c.funciones.map(f => `<li>${f}</li>`).join('');

  body.innerHTML = `
    <span class="modal-codigo">${c.codigo}</span>
    <h2>${c.cargo}</h2>
    <p style="color: var(--primary-cyan); margin-bottom: 1.5rem;">${c.area} · Nivel ${c.nivel}</p>

    <h3>Propósito del Cargo</h3>
    <p>${c.proposito}</p>

    <h3>Formación Académica</h3>
    <p>${c.formacion}</p>

    <h3>Formación Complementaria</h3>
    <p>${c.formacionComp}</p>

    <h3>Experiencia Requerida</h3>
    <p>${c.experiencia}</p>

    <h3>Competencias Técnicas</h3>
    <p>${c.compTecnicas}</p>

    <h3>Competencias Comportamentales</h3>
    <p>${c.compComportamentales}</p>

    <h3>Funciones Principales</h3>
    <ul>${listaFunciones}</ul>

    <h3>Responsabilidades</h3>
    <p>${c.responsabilidades}</p>

    <h3>Autoridad</h3>
    <p>${c.autoridad}</p>

    <h3>Relaciones Internas</h3>
    <p>${c.relInternas}</p>

    <h3>Relaciones Externas</h3>
    <p>${c.relExternas}</p>

    <h3>Indicadores de Desempeño</h3>
    <p>${c.indicadores}</p>

    <h3>Modalidad de Vinculación</h3>
    <p>${c.modalidad}</p>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('modal-overlay');
  if (e.target === overlay) cerrarModal();
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});