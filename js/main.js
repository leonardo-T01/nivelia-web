// js/main.js - NIVELIA S.A.S. Interactive UI Controller

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Detección automática del menú activo
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 2. Control de Pestañas Interactivas (Tabs)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabGroup = button.closest('.tabs-container');
      const targetId = button.getAttribute('data-tab');

      tabGroup.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

      button.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // 3. Control de Acordeones (Políticas Corporativas)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // 4. Fallback dinámico de imágenes si no se cargan
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (this.classList.contains('logo-img')) {
        this.style.display = 'none';
      }
    });
  });

});