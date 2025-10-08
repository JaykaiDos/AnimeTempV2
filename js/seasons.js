/* ============================================
   ANIME TEMPORADAS - JAVASCRIPT
   Autor: Jaykai2
   Funcionalidades: Carousel, Favoritos, Búsqueda, Dark Mode
   ============================================ */

// ============================================
// DARK MODE TOGGLE
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  // Alternar filtro de inversión de colores
  const currentFilter = body.style.filter;
  body.style.filter = currentFilter === 'invert(1) hue-rotate(180deg)' ? '' : 'invert(1) hue-rotate(180deg)';
  
  // Guardar preferencia en localStorage
  localStorage.setItem('darkMode', body.style.filter ? 'on' : 'off');
  
  // Actualizar texto del botón
  darkModeToggle.textContent = body.style.filter ? 'Modo Normal' : 'Modo Alternativo';
});

// Cargar preferencia de dark mode al inicio
if (localStorage.getItem('darkMode') === 'on') {
  body.style.filter = 'invert(1) hue-rotate(180deg)';
  darkModeToggle.textContent = 'Modo Normal';
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================
document.querySelectorAll('.carousel-container').forEach(carousel => {
  const container = carousel.querySelector('.carousel-images');
  const images = container.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  
  let currentIndex = 0;

  // Función para actualizar la posición del carousel
  const updateCarousel = () => {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Botón anterior
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  // Botón siguiente
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  // Auto-play opcional (descomenta si quieres que rote automáticamente)
  /*
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, 5000); // Cambiar cada 5 segundos
  */
});

// ============================================
// FAVORITES SYSTEM
// ============================================

// Obtener elementos del DOM
const favButtons = document.querySelectorAll('.fav-btn');
const favList = document.querySelector('.fav-list:not(.none)');
const favNone = document.querySelector('.fav-list.none');
const clearBtn = document.getElementById('clearFavoritesBtn');

// Cargar favoritos desde localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Función para renderizar la lista de favoritos
const renderFavorites = () => {
  if (favorites.length === 0) {
    // ... (código para mostrar "sin favoritos" no cambia)
    favNone.style.display = 'block';
    favList.style.display = 'none';
    favList.innerHTML = '';
  } else {
    // Mostrar lista de favoritos
    favNone.style.display = 'none';
    favList.style.display = 'block';
    
    // 3. Iterar sobre el array de objetos y usar fav.title
    favList.innerHTML = favorites.map(fav => {
      // No necesitamos buscar la tarjeta por ID, ya tenemos el título guardado
      return `<li>${fav.title}</li>`;
    }).join('');
  }

  // Actualizar estado de los botones
  updateFavButtons();
};

// ============================================
// FUNCIÓN PARA ACTUALIZAR ESTADO VISUAL DE BOTONES (CORREGIDO)
// ============================================
const updateFavButtons = () => {
  favButtons.forEach(btn => {
    const id = btn.dataset.id;
    
    // FIX: Usar .some() para verificar si algún objeto tiene el ID coincidente
    const isFavorite = favorites.some(fav => fav.id === id);

    if (isFavorite) {
      btn.classList.add('active');
      btn.textContent = 'En Favoritos ★';
    } else {
      btn.classList.remove('active');
      btn.textContent = 'Agregar a Favoritos';
    }
  });
};

// Event listeners para cada botón de favorito
favButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    // Buscamos la tarjeta padre para obtener el título
    const card = btn.closest('.anime-card');
    const title = card ? card.dataset.title : id; // Usar el ID como fallback

    // 1. Verificar si el ID ya existe en el nuevo formato de array de objetos
    const favIndex = favorites.findIndex(fav => fav.id === id);

    if (favIndex !== -1) {
      // Quitar de favoritos
      favorites.splice(favIndex, 1);
    } else {
      // 2. Agregar a favoritos como un OBJETO con ID y TITLE
      favorites.push({ id, title });
    }
    
    // Guardar en localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Re-renderizar
    renderFavorites();
  });
});

// Botón para limpiar todos los favoritos
clearBtn.addEventListener('click', () => {
  if (favorites.length > 0) {
    const confirm = window.confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?');
    
    if (confirm) {
      favorites = [];
      localStorage.removeItem('favorites');
      renderFavorites();
    }
  }
});

// Renderizar favoritos al cargar la página
renderFavorites();

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchBar = document.getElementById('searchBar');
const animeCards = document.querySelectorAll('.anime-card');

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase().trim();
  
  animeCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    
    if (title.includes(query)) {
      card.style.display = '';
      // Animación de entrada
      card.style.animation = 'fadeIn 0.3s ease-out';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Mostrar mensaje si no hay resultados
  const visibleCards = Array.from(animeCards).filter(card => card.style.display !== 'none');
  
  if (visibleCards.length === 0 && query !== '') {
    showNoResultsMessage();
  } else {
    hideNoResultsMessage();
  }
});

// Función para mostrar mensaje de "sin resultados"
const showNoResultsMessage = () => {
  let message = document.getElementById('no-results-message');
  
  if (!message) {
    message = document.createElement('div');
    message.id = 'no-results-message';
    message.style.cssText = `
      text-align: center;
      padding: 3rem;
      color: #48cae480;
      font-size: 1.2rem;
      font-style: italic;
    `;
    message.textContent = '😔 No se encontraron animes con ese nombre';
    
    document.querySelector('.container').appendChild(message);
  }
  
  message.style.display = 'block';
};

// Función para ocultar mensaje de "sin resultados"
const hideNoResultsMessage = () => {
  const message = document.getElementById('no-results-message');
  if (message) {
    message.style.display = 'none';
  }
};

// ============================================
// SMOOTH SCROLL (para navegación futura)
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
    }
  });
});

// ============================================
// LAZY LOADING PARA IMÁGENES (Opcional)
// ============================================
/*
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
*/

// ============================================
// KEYBOARD SHORTCUTS (Opcional)
// ============================================
document.addEventListener('keydown', (e) => {
  // Presiona '/' para enfocar la búsqueda
  if (e.key === '/' && document.activeElement !== searchBar) {
    e.preventDefault();
    searchBar.focus();
  }
  
  // Presiona 'Escape' para limpiar búsqueda
  if (e.key === 'Escape' && document.activeElement === searchBar) {
    searchBar.value = '';
    searchBar.dispatchEvent(new Event('input'));
    searchBar.blur();
  }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(`
╔═══════════════════════════════════════╗
║   🎌 ANIME OTOÑO 2025 🎌              ║
║   Hecho por: Jaykai2                   ║
║   Estilo: Matrix/Neon Cyberpunk        ║
╚═══════════════════════════════════════╝
`);

console.log('💡 Atajos de teclado:');
console.log('  "/" - Enfocar búsqueda');
console.log('  "Esc" - Limpiar búsqueda');

// ============================================
// INICIALIZACIÓN COMPLETA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Página cargada completamente');
  console.log(`📺 Total de animes: ${animeCards.length}`);
  console.log(`⭐ Favoritos guardados: ${favorites.length}`);
});