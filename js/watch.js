/* ============================================
   WATCH PAGE - JAVASCRIPT
   Autor: Jaykai2
   ============================================ */

// Base de datos simulada (misma estructura que anime-details.js)
const animesData = {
  'anime1': {
    id: 'anime1',
    title: 'Boku no Hero Academia FINAL SEASON',
    episodes: 24,
    episodesList: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Episodio ${i + 1}`,
      duration: '24 min',
      // Ejemplo con links de Google Drive
      videoUrl: `https://drive.google.com/file/d/1UW8oscUrJLNFmakLMJLhhOh3yROZXatq/preview`
    }))
  },
  'anime2': {
    id: 'anime2',
    title: 'Fumetsu no Anata e Season 3',
    episodes: 12,
episodesList: [
  { number: 1, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1UW8oscUrJLNFmakLMJLhhOh3yROZXatq/preview' }
]},
  'anime3': {
    id: 'anime3',
    title: 'Fumetsu no Anata e Season 2',
    episodes: 20,
episodesList: [
  { number: 1, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1UW8oscUrJLNFmakLMJLhhOh3yROZXatq/preview' },
  { number: 2, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1eLsf8K03FgJ9R8hmG2BVpQ-wBMDXROyj/preview' },
  { number: 3, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1-ypXsrrWUGBFB3HpO6yFfgVCFB0ZSSrP/preview' },
  { number: 4, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/150nAdtnHIq-luuDpuGvTowiYsQCEkxjc/preview' },
  { number: 5, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1o51PIim-dfohS2XcPnYVB7z-5yeUfyQP/preview' },
  { number: 6, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1m0_87Cmw7xttzQPjflwoFxqNMOVYgkuF/preview' },
  { number: 7, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1W5NhDI8pvFXA68xwpsIN464fqJN3NEm-/preview' },
  { number: 8, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1W5NhDI8pvFXA68xwpsIN464fqJN3NEm-/preview' },
  { number: 9, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1hu7skywHkGt09aTsjAio2vGZi7hI_kk-/preview' },
  { number: 10, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1fy9i9KDcEv9Vq6or_1trXaKej1bmVxxD/prewview' },
  { number: 11, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1OpONGO_QSLObQ8HpwfOlT0TH1hLjHqLm/preview' },
  { number: 12, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1OlbkUJTn-FYuOeOTg5Xuqe5yThYzbqYr/prewview' },
  { number: 13, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1Z6iyOdX8cQsnHQU-bkucQshzxek7HNOU/prewview' },
  { number: 14, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/14IdSf1ggxaTR7pudJ95x3gk7bTaLAkJK/prewview' },
  { number: 15, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1ZDGWJANkq_i9-pozAqr2K2hpJ3rgXYlk/prewview' },
  { number: 16, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1-tBxiR8c8RhR940KKGTg1OszKyE0ZCNv/prewview' },
  { number: 17, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1e9RJMr9daWlOS0BHTN6wM4l7Wau1VDdp/prewview' },
  { number: 18, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1HlEdhHOe-i7_BJkJI4xWyikLYfFXJdkD/prewview' },
  { number: 19, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1JWLrrEHMOMWxKU-TbA4s0P7GE1MEAzdL/prewview' },
  { number: 20, title: '??', duration: '24 min', videoUrl: 'https://drive.google.com/file/d/1c9jUzsE2zUm1nM5493xv-c_63B3kTN0M/prewview' }
]}
};

// Estado de la aplicación
let currentAnime = null;
let currentEpisodeNumber = 1;
let watchedEpisodes = [];

// Elementos del DOM
const videoContainer = document.getElementById('videoContainer');
const videoTitle = document.getElementById('videoTitle');
const animeTitle = document.getElementById('animeTitle');
const episodeNumber = document.getElementById('episodeNumber');
const episodeTitle = document.getElementById('episodeTitle');
const animeLink = document.getElementById('animeLink');
const episodesList = document.getElementById('episodesList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const markWatchedBtn = document.getElementById('markWatchedBtn');

// ============================================
// CARGAR EPISODIOS VISTOS
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
// CONVERTIR LINK DE GOOGLE DRIVE
// ============================================
const getEmbedUrl = (driveUrl) => {
  // Si ya es un link de preview, retornarlo
  if (driveUrl.includes('/preview')) {
    return driveUrl;
  }
  
  // Convertir link de view a preview
  if (driveUrl.includes('/view')) {
    return driveUrl.replace('/view', '/preview');
  }
  
  // Extraer ID del archivo y crear URL de embed
  const fileIdMatch = driveUrl.match(/\/d\/([^/]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  
  return driveUrl;
};

// ============================================
// RENDERIZAR VIDEO PLAYER
// ============================================
const renderVideoPlayer = (episode) => {
  const embedUrl = getEmbedUrl(episode.videoUrl);
  
  videoContainer.innerHTML = `
    <iframe 
      src="${embedUrl}" 
      allow="autoplay; encrypted-media" 
      allowfullscreen
      title="${currentAnime.title} - Episodio ${episode.number}">
    </iframe>
  `;

  // Actualizar información
  videoTitle.textContent = `${currentAnime.title} - Episodio ${episode.number}`;
  animeTitle.textContent = `📺 ${currentAnime.title}`;
  episodeNumber.textContent = `EP ${episode.number}`;
  episodeTitle.textContent = `Episodio ${episode.number}`;

  // Actualizar breadcrumb link
  animeLink.href = `anime-details.html?id=${currentAnime.id}`;
  animeLink.textContent = `📺 ${currentAnime.title}`;

  // Actualizar botón de visto
  updateWatchedButton();

  // Marcar automáticamente como visto después de 5 segundos
  setTimeout(() => {
    if (!watchedEpisodes.includes(episode.number)) {
      watchedEpisodes.push(episode.number);
      saveWatchedEpisodes(currentAnime.id, watchedEpisodes);
      updateWatchedButton();
      renderEpisodesList();
    }
  }, 5000);
};

// ============================================
// RENDERIZAR LISTA DE EPISODIOS
// ============================================
const renderEpisodesList = () => {
  if (!currentAnime || !currentAnime.episodesList) return;

  episodesList.innerHTML = currentAnime.episodesList.map(ep => `
    <div class="episode-item ${ep.number === currentEpisodeNumber ? 'active' : ''} ${watchedEpisodes.includes(ep.number) ? 'watched' : ''}"
         onclick="loadEpisode(${ep.number})">
      <div class="episode-item-number">EP ${ep.number}</div>
      <div class="episode-item-title">${ep.title}</div>
    </div>
  `).join('');
};

// ============================================
// CARGAR EPISODIO
// ============================================
window.loadEpisode = (episodeNum) => {
  if (!currentAnime) return;

  const episode = currentAnime.episodesList.find(ep => ep.number === episodeNum);
  if (!episode) return;

  currentEpisodeNumber = episodeNum;

  // Actualizar URL sin recargar
  const newUrl = `${window.location.pathname}?anime=${currentAnime.id}&episode=${episodeNum}`;
  window.history.pushState({ anime: currentAnime.id, episode: episodeNum }, '', newUrl);

  // Renderizar
  renderVideoPlayer(episode);
  renderEpisodesList();
  updateNavigationButtons();

  // Scroll al top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================
// NAVEGACIÓN: EPISODIO ANTERIOR
// ============================================
window.previousEpisode = () => {
  if (currentEpisodeNumber > 1) {
    loadEpisode(currentEpisodeNumber - 1);
  }
};

// ============================================
// NAVEGACIÓN: EPISODIO SIGUIENTE
// ============================================
window.nextEpisode = () => {
  if (currentEpisodeNumber < currentAnime.episodes) {
    loadEpisode(currentEpisodeNumber + 1);
  }
};

// ============================================
// ACTUALIZAR BOTONES DE NAVEGACIÓN
// ============================================
const updateNavigationButtons = () => {
  prevBtn.disabled = currentEpisodeNumber <= 1;
  nextBtn.disabled = currentEpisodeNumber >= currentAnime.episodes;
};

// ============================================
// TOGGLE EPISODIO VISTO
// ============================================
window.toggleWatched = () => {
  const index = watchedEpisodes.indexOf(currentEpisodeNumber);
  
  if (index !== -1) {
    watchedEpisodes.splice(index, 1);
  } else {
    watchedEpisodes.push(currentEpisodeNumber);
  }

  saveWatchedEpisodes(currentAnime.id, watchedEpisodes);
  updateWatchedButton();
  renderEpisodesList();
};

// ============================================
// ACTUALIZAR BOTÓN DE VISTO
// ============================================
const updateWatchedButton = () => {
  const isWatched = watchedEpisodes.includes(currentEpisodeNumber);
  
  if (isWatched) {
    markWatchedBtn.classList.add('watched');
    markWatchedBtn.innerHTML = '✓ Marcado como Visto';
  } else {
    markWatchedBtn.classList.remove('watched');
    markWatchedBtn.innerHTML = '✓ Marcar como Visto';
  }
};

// ============================================
// ATAJOS DE TECLADO
// ============================================
document.addEventListener('keydown', (e) => {
  // Flecha izquierda: episodio anterior
  if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
    e.preventDefault();
    previousEpisode();
  }
  
  // Flecha derecha: episodio siguiente
  if (e.key === 'ArrowRight' && !nextBtn.disabled) {
    e.preventDefault();
    nextEpisode();
  }
  
  // Tecla 'M': marcar como visto
  if (e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    toggleWatched();
  }
});

// ============================================
// CARGAR DESDE URL
// ============================================
const loadFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('anime');
  const episodeNum = parseInt(urlParams.get('episode')) || 1;

  if (!animeId || !animesData[animeId]) {
    videoContainer.innerHTML = `
      <div class="loading">
        <span style="font-size: 5rem;">😢</span>
        <h2 style="color: #ade8f4; margin: 1rem 0;">Anime no encontrado</h2>
        <p>El anime que buscas no existe.</p>
        <a href="search.html" class="footer-link" style="margin-top: 2rem;">🔍 Volver a Búsqueda</a>
      </div>
    `;
    return;
  }

  currentAnime = animesData[animeId];
  currentEpisodeNumber = episodeNum;
  watchedEpisodes = loadWatchedEpisodes(animeId);

  const episode = currentAnime.episodesList.find(ep => ep.number === episodeNum);
  if (!episode) {
    loadEpisode(1);
    return;
  }

  renderVideoPlayer(episode);
  renderEpisodesList();
  updateNavigationButtons();
};

// ============================================
// MANEJAR NAVEGACIÓN DEL NAVEGADOR
// ============================================
window.addEventListener('popstate', (e) => {
  if (e.state) {
    loadFromUrl();
  }
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('▶️ Página de reproducción cargada');
  loadFromUrl();
});

console.log(`
╔═══════════════════════════════════════╗
║   ▶️ VIDEO PLAYER ▶️                 ║
║   Reproducción de Episodios          ║
║   Hecho por: Jaykai2                 ║
║                                       ║
║   Atajos de Teclado:                 ║
║   ← Episodio Anterior                ║
║   → Episodio Siguiente               ║
║   M Marcar como Visto                ║
╚═══════════════════════════════════════╝
`);