/* ============================================
   ANIME DETAILS - JAVASCRIPT
   Autor: Jaykai2
   ============================================ */

// Base de datos simulada de animes con capítulos
const animesData = {
  'anime1': {
    id: 'anime1',
    title: 'Boku no Hero Academia FINAL SEASON',
    season: 'fall',
    seasonName: 'Otoño 2025',
    poster: 'https://u.livechart.me/anime_visuals/local_version/13094/image/63b54dc8072513c6cff7ad7a3a5e504d.webp/large.jpg',
    synopsis: 'Última temporada de Boku no Hero Academia. La batalla final contra All For One y los villanos llega a su conclusión épica.',
    episodes: 1,
    status: 'En emisión',
    trailers: [
      'https://www.youtube.com/embed/RSbqvK5OSFc',
      'https://www.youtube.com/embed/ZKKCpQZjjbI'
    ],
    episodesList: Array.from({ length: 1 }, (_, i) => ({
      number: i + 1,
      title: `Episodio ${i + 1}`,
      duration: '24 min'
    }))
  },
  'anime2': {
    id: 'anime2',
    title: 'Fumetsu no Anata e Season 3',
    season: 'fall',
    seasonName: 'Otoño 2025',
    poster: 'https://u.livechart.me/anime_visuals/local_version/13853/image/ad92c398d8bb190611e03058e0eda280.webp/large.jpg',
    synopsis: 'Tercera temporada de Fumetsu no Anata e. La historia continúa explorando la inmortalidad y la humanidad a través de nuevos personajes y desafíos.',
    episodes: 1,
    status: 'En emisión',
    trailers: [
      'https://www.youtube.com/embed/deRFCYG45kM',
      'https://www.youtube.com/embed/JmT51BjIJ5w'
    ],
    episodesList: Array.from({ length: 1 }, (_, i) => ({
      number: i + 1,
      title: `Episodio ${i + 1}`,
      duration: '24 min'
    }))
  },
  'anime3': {
    id: 'anime3',
    title: 'Fumetsu no Anata e Season 2',
    season: 'Ni idea',
    seasonName: ' ni idea que año salio',
    poster: 'https://u.livechart.me/anime/10767/poster_image/69e448112748517d1475c57d9514e210.webp/large.jpg',
    synopsis: 'Segunda temporada de Fumetsu no Anata e Season 2.',
    episodes: 20,
    status: 'Finalizado',
    trailers: [
      'https://www.youtube.com/embed/kZDrI310VNs',
      'https://www.youtube.com/embed/r3i95sWsdkM'
    ],
    episodesList: Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      title: `Episodio ${i + 1}`,
      duration: '24 min'
    }))
  }
  // Agregar más animes siguiendo el mismo patrón
};

// Estado de la aplicación
let currentAnime = null;
let watchedEpisodes = [];
let currentFilter = 'all';

// Elementos del DOM
const animeDetails = document.getElementById('animeDetails');
const episodesSection = document.getElementById('episodesSection');
const episodesGrid = document.getElementById('episodesGrid');
const breadcrumbTitle = document.getElementById('breadcrumbTitle');

// ============================================
// CARGAR EPISODIOS VISTOS DESDE LOCALSTORAGE
// ============================================
const loadWatchedEpisodes = (animeId) => {
  const stored = localStorage.getItem(`watched_${animeId}`);
  return stored ? JSON.parse(stored) : [];
};

// ============================================
// GUARDAR EPISODIOS VISTOS
// ============================================
const saveWatchedEpisodes = (animeId, episodes) => {
  localStorage.setItem(`watched_${animeId}`, JSON.stringify(episodes));
};

// ============================================
// RENDERIZAR DETALLES DEL ANIME
// ============================================
const renderAnimeDetails = (anime) => {
  animeDetails.innerHTML = `
    <div class="details-hero">
      <img src="${anime.poster}" alt="${anime.title}" class="anime-poster">
      
      <div class="anime-info">
        <h1 class="anime-title">${anime.title}</h1>
        
        <div class="anime-meta">
          <span class="meta-badge season">📅 ${anime.seasonName}</span>
          <span class="meta-badge status">🔴 ${anime.status}</span>
          <span class="meta-badge episodes">📺 ${anime.episodes} episodios</span>
        </div>
        
        <div class="anime-synopsis">
          <h3>📖 Sinopsis</h3>
          <p>${anime.synopsis}</p>
        </div>
        
        <div class="anime-actions">
          <button class="action-btn btn-primary" onclick="playFirstEpisode()">
            ▶️ Ver Primer Episodio
          </button>
          <button class="action-btn btn-secondary" id="favBtn" onclick="toggleFavorite()">
            ⭐ Agregar a Favoritos
          </button>
        </div>
      </div>
    </div>
    
    ${anime.trailers && anime.trailers.length > 0 ? `
    <div class="anime-trailers">
      <h3>🎬 Trailers</h3>
      <div class="trailers-grid">
        ${anime.trailers.map(trailer => `
          <iframe src="${trailer}" title="Trailer" allowfullscreen></iframe>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  // Actualizar estado del botón de favoritos
  updateFavoriteButton();
};

// ============================================
// RENDERIZAR LISTA DE EPISODIOS
// ============================================
const renderEpisodes = (filter = 'all') => {
  if (!currentAnime || !currentAnime.episodesList) return;

  let episodes = currentAnime.episodesList;

  // Aplicar filtro
  if (filter === 'watched') {
    episodes = episodes.filter(ep => watchedEpisodes.includes(ep.number));
  } else if (filter === 'unwatched') {
    episodes = episodes.filter(ep => !watchedEpisodes.includes(ep.number));
  }

  if (episodes.length === 0) {
    episodesGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #48cae480;">
        <p>No hay episodios en esta categoría</p>
      </div>
    `;
    return;
  }

  episodesGrid.innerHTML = episodes.map(episode => `
    <article class="episode-card ${watchedEpisodes.includes(episode.number) ? 'watched' : ''}"
             onclick="playEpisode(${episode.number})">
      <div class="episode-number">EP ${episode.number}</div>
      <h3 class="episode-title">${episode.title}</h3>
      <p class="episode-duration">⏱️ ${episode.duration}</p>
    </article>
  `).join('');
};

// ============================================
// REPRODUCIR EPISODIO
// ============================================
window.playEpisode = (episodeNumber) => {
  // Marcar como visto
  if (!watchedEpisodes.includes(episodeNumber)) {
    watchedEpisodes.push(episodeNumber);
    saveWatchedEpisodes(currentAnime.id, watchedEpisodes);
  }

  // Navegar a página de reproducción
  window.location.href = `watch.html?anime=${currentAnime.id}&episode=${episodeNumber}`;
};

// ============================================
// REPRODUCIR PRIMER EPISODIO
// ============================================
window.playFirstEpisode = () => {
  playEpisode(1);
};

// ============================================
// TOGGLE FAVORITO
// ============================================
window.toggleFavorite = () => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favIndex = favorites.findIndex(fav => fav.id === currentAnime.id);

  if (favIndex !== -1) {
    favorites.splice(favIndex, 1);
  } else {
    favorites.push({ 
      id: currentAnime.id, 
      title: currentAnime.title 
    });
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteButton();
};

// ============================================
// ACTUALIZAR BOTÓN DE FAVORITOS
// ============================================
const updateFavoriteButton = () => {
  const favBtn = document.getElementById('favBtn');
  if (!favBtn) return;

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some(fav => fav.id === currentAnime.id);

  if (isFavorite) {
    favBtn.classList.add('active');
    favBtn.innerHTML = '⭐ En Favoritos';
  } else {
    favBtn.classList.remove('active');
    favBtn.innerHTML = '⭐ Agregar a Favoritos';
  }
};

// ============================================
// FILTROS DE EPISODIOS
// ============================================
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    // Remover active de todos
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Agregar active al clickeado
    e.target.classList.add('active');
    
    // Aplicar filtro
    const filter = e.target.dataset.filter;
    currentFilter = filter;
    renderEpisodes(filter);
  }
});

// ============================================
// CARGAR ANIME DESDE URL
// ============================================
const loadAnime = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id');
  
  if (!animeId || !animesData[animeId]) {
    animeDetails.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <span style="font-size: 5rem;">😢</span>
        <h2 style="color: #ade8f4; margin: 1rem 0;">Anime no encontrado</h2>
        <p style="color: #48cae480;">El anime que buscas no existe en nuestra base de datos.</p>
        <a href="search.html" class="footer-link" style="margin-top: 2rem;">🔍 Volver a Búsqueda</a>
      </div>
    `;
    return;
  }

  currentAnime = animesData[animeId];
  watchedEpisodes = loadWatchedEpisodes(animeId);

  // Actualizar breadcrumb
  breadcrumbTitle.textContent = currentAnime.title;

  // Renderizar
  renderAnimeDetails(currentAnime);
  
  // Mostrar sección de episodios
  episodesSection.style.display = 'block';
  renderEpisodes(currentFilter);
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('📺 Página de detalles cargada');
  loadAnime();
});

console.log(`
╔═══════════════════════════════════════╗
║   📺 ANIME DETAILS 📺                ║
║   Detalles y Lista de Capítulos      ║
║   Hecho por: Jaykai2                 ║
╚═══════════════════════════════════════╝
`);