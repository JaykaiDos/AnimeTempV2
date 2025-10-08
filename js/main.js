/* ============================================
   ANIME HUB - JAVASCRIPT PRINCIPAL
   Autor: Jaykai2
   ============================================ */

// ============================================
// CARGAR FAVORITOS GLOBALES - MODIFICADO
// ============================================
function loadGlobalFavorites() {
  // Ahora favorites es un array de objetos: [{id: "anime1", title: "Boku no Hero..."}, ...]
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favCount = document.getElementById('favCount');
  const favGrid = document.getElementById('globalFavorites');
  
  // ... (código para actualizar contador no cambia)
  if (favCount) {
    favCount.textContent = favorites.length;
  }
  
  // Mostrar favoritos
  if (favorites.length === 0) {
    favGrid.innerHTML = '<p class="no-favorites">No tienes favoritos aún. ¡Explora las temporadas y agrega tus animes favoritos!</p>';
  } else {
    // Iteramos sobre el objeto fav (que contiene id y title)
    favGrid.innerHTML = favorites.map(fav => {
      // Usamos fav.title para mostrar el nombre
      return `
        <div class="fav-card">
          <div class="fav-icon">⭐</div>
          <p>${fav.title}</p> 
        </div>
      `;
    }).join('');
  }
}

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualizar navegación activa
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// ============================================
// INTERSECTION OBSERVER PARA ANIMACIONES
// ============================================
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar tarjetas de temporadas
document.querySelectorAll('.season-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// Observar tarjetas about
document.querySelectorAll('.about-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// ============================================
// ACTUALIZAR NAVEGACIÓN AL HACER SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ============================================
// ESTADÍSTICAS ANIMADAS
// ============================================
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + (stat.id === 'favCount' ? '' : '+');
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + (stat.id === 'favCount' ? '' : '+');
      }
    }, 30);
  });
}

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================
window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const scrolled = window.pageYOffset;
    heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroSection.style.opacity = 1 - (scrolled / 600);
  }
});

// ============================================
// AGREGAR RIPPLE EFFECT A BOTONES
// ============================================
document.querySelectorAll('.season-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Estilos para el ripple (agregar dinámicamente)
const style = document.createElement('style');
style.textContent = `
  .season-btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// MENSAJE DE CONSOLA
// ============================================
console.log(`
╔═══════════════════════════════════════╗
║   🎌 ANIME HUB 🎌                     ║
║   Hub Principal de Temporadas         ║
║   Hecho por: Jaykai2                 ║
╚═══════════════════════════════════════╝
`);

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Hub cargado completamente');
  
  // Cargar favoritos
  loadGlobalFavorites();
  
  // Animar estadísticas después de un delay
  setTimeout(() => {
    animateStats();
  }, 500);
  
  // Log de temporadas disponibles
  const seasons = document.querySelectorAll('.season-card');
  console.log(`📅 Temporadas disponibles: ${seasons.length}`);
});

// ============================================
// GUARDAR SCROLL POSITION
// ============================================
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY);
});

// Restaurar scroll position
window.addEventListener('load', () => {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    localStorage.removeItem('scrollPosition');
  }
});