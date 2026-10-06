// js/main.js - NIVELIA S.A.S.

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Marcar automáticamente el enlace 'active' en el menú según la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 2. Manejo interactivo del formulario de Contacto
  const contactForm = document.querySelector('form[action=""], section form');
  if (contactForm && window.location.pathname.includes('contacto.html')) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Requerimiento enviado exitosamente a la Dirección Comercial de NIVELIA S.A.S.');
      contactForm.reset();
    });
  }

  // 3. Manejo interactivo del formulario de Intranet
  const intranetForm = document.querySelector('.card form');
  if (intranetForm && window.location.pathname.includes('documentos.html')) {
    intranetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Acceso Restringido: Sus credenciales han sido enviadas a la Dirección Administrativa para validación.');
      intranetForm.reset();
    });
  }

});