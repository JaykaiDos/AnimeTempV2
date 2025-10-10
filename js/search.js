/* ============================================
   ANIME SEARCH - JAVASCRIPT
   Autor: Jaykai2
   ============================================ */

// Base de datos de animes (simulada)
const animesDatabase = [
  {
    id: 'anime1',
    title: 'Boku no Hero Academia FINAL SEASON',
    season: 'fall',
    image: 'https://u.livechart.me/anime_visuals/local_version/13094/image/63b54dc8072513c6cff7ad7a3a5e504d.webp/large.jpg',
    type: 'Continuación'
  },
  {
    id: 'anime2',
    title: 'Fumetsu no Anata e Season 3',
    season: 'fall',
    image: 'https://u.livechart.me/anime_visuals/local_version/13853/image/ad92c398d8bb190611e03058e0eda280.webp/large.jpg',
    type: 'Continuación'
  },
  {
    id: 'anime3',
    title: 'Fumetsu no Anata e Season 2',
    season: '???',
    image: 'https://u.livechart.me/anime_visuals/local_version/13853/image/ad92c398d8bb190611e03058e0eda280.webp/large.jpg',
    type: 'Continuación'
  }
  // Agrega más animes aquí siguiendo el mismo formato
];

// Estado de la aplicación
let filteredAnimes = [...animesDatabase];
let currentSort = 'default';
let currentSeason = 'all';
let currentSearch = '';

// Elementos del DOM
const searchBar = document.getElementById('searchBar');
const seasonFilter = document.getElementById('seasonFilter');
const sortFilter = document.getElementById('sortFilter');
const animeGrid = document.getElementById('animeGrid');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('no-results');

// Mapeo de nombres de temporadas
const seasonNames = {
  fall: 'Otoño',
  winter: 'Invierno',
  spring: 'Primavera',
  summer: 'Verano'
};

// ============================================
// FUNCIÓN PARA RENDERIZAR LAS TARJETAS
// ============================================
const renderAnimeCards = (animes) => {
  if (animes.length === 0) {
    animeGrid.style.display = 'none';
    noResults.style.display = 'block';
    resultsCount.textContent = 'No se encontraron animes';
    return;
  }

  animeGrid.style.display = 'grid';
  noResults.style.display = 'none';
  resultsCount.textContent = `Mostrando ${animes.length} anime${animes.length !== 1 ? 's' : ''}`;

  animeGrid.innerHTML = animes.map(anime => `
    <article class="anime-card" onclick="navigateToDetails('${anime.id}', '${anime.season}')">
      <span class="season-badge ${anime.season}">${seasonNames[anime.season]}</span>
      <img src="${anime.image}" alt="${anime.title}" class="card-image" loading="lazy">
      <h3 class="card-title">${anime.title}</h3>
      <p class="card-info">📺 ${anime.type}</p>
    </article>
  `).join('');
};

// ============================================
// FUNCIÓN DE NAVEGACIÓN A DETALLES
// ============================================
window.navigateToDetails = (animeId, season) => {
  // Guardar el ID del anime en localStorage
  localStorage.setItem('selectedAnime', animeId);
  localStorage.setItem('selectedSeason', season);
  
  // Navegar a la página de detalles
  window.location.href = `anime-details.html?id=${animeId}&season=${season}`;
};

// ============================================
// FUNCIÓN PARA APLICAR FILTROS
// ============================================
const applyFilters = () => {
  // Filtrar por temporada
  let result = currentSeason === 'all' 
    ? [...animesDatabase] 
    : animesDatabase.filter(anime => anime.season === currentSeason);

  // Filtrar por búsqueda
  if (currentSearch) {
    result = result.filter(anime => 
      anime.title.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  // Ordenar
  if (currentSort === 'az') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === 'za') {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }

  filteredAnimes = result;
  renderAnimeCards(filteredAnimes);
};

// ============================================
// EVENT LISTENERS
// ============================================

// Búsqueda en tiempo real
searchBar.addEventListener('input', (e) => {
  currentSearch = e.target.value.trim();
  applyFilters();
});

// Filtro de temporada
seasonFilter.addEventListener('change', (e) => {
  currentSeason = e.target.value;
  applyFilters();
});

// Filtro de ordenamiento
sortFilter.addEventListener('change', (e) => {
  currentSort = e.target.value;
  applyFilters();
});

// Atajo de teclado para búsqueda
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchBar) {
    e.preventDefault();
    searchBar.focus();
  }
  
  if (e.key === 'Escape' && document.activeElement === searchBar) {
    searchBar.value = '';
    currentSearch = '';
    applyFilters();
    searchBar.blur();
  }
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 Página de búsqueda cargada');
  console.log(`📊 Total de animes en base de datos: ${animesDatabase.length}`);
  
  // Renderizar todos los animes inicialmente
  renderAnimeCards(animesDatabase);
  
  // Restaurar filtros desde URL si existen
  const urlParams = new URLSearchParams(window.location.search);
  const seasonParam = urlParams.get('season');
  
  if (seasonParam && ['fall', 'winter', 'spring', 'summer'].includes(seasonParam)) {
    seasonFilter.value = seasonParam;
    currentSeason = seasonParam;
    applyFilters();
  }
});

console.log(`
╔═══════════════════════════════════════╗
║   🔍 ANIME SEARCH 🔍                 ║
║   Búsqueda y Filtrado Avanzado       ║
║   Hecho por: Jaykai2                 ║
╚═══════════════════════════════════════╝
`);