/* ============================================
   MARENTROPICO — Media Embed Module
   Handles: YouTube, Spotify, Photo galleries
   ============================================ */

const MediaEmbed = (() => {

  // ============ YOUTUBE ============

  function extractYouTubeId(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be'))   return u.pathname.slice(1).split('?')[0];
      if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
    } catch (_) {}
    // Fallback regex
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function buildYouTubeThumbnail(videoId, title) {
    return `
      <div class="milestone-media">
        <div class="yt-thumbnail-wrapper" onclick="MediaEmbed.openYouTubePlayer('${videoId}')" role="button" tabindex="0"
             onkeydown="if(event.key==='Enter')MediaEmbed.openYouTubePlayer('${videoId}')"
             aria-label="Reproduzir vídeo: ${title}">
          <img
            src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
            alt="Thumbnail: ${title}"
            loading="lazy"
            onerror="this.src='https://img.youtube.com/vi/${videoId}/mqdefault.jpg'"
          >
          <div class="yt-play-btn">
            <div class="yt-play-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </div>`;
  }

  function openYouTubePlayer(videoId) {
    window.openLightbox(`
      <div style="position:relative;aspect-ratio:16/9;background:#000;border-radius:8px;overflow:hidden;">
        <iframe
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="width:100%;height:100%;border:none;"
          title="YouTube video player"
        ></iframe>
      </div>
    `);
  }

  // ============ SPOTIFY ============

  function convertSpotifyUrl(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      // Strip /intl-pt/ prefix if present, then get type+id
      const parts = u.pathname
        .split('/')
        .filter(p => p && p !== 'intl-pt'); // ['track','1Ghiz...']
      if (parts.length >= 2) {
        const type = parts[0]; // track | album | playlist | artist
        const id   = parts[1].split('?')[0];
        return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
      }
    } catch (_) {}
    return null;
  }

  function buildSpotifyEmbed(url) {
    const embedUrl = convertSpotifyUrl(url);
    if (!embedUrl) return '';
    return `
      <div class="milestone-media spotify-embed">
        <iframe
          src="${embedUrl}"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify player"
        ></iframe>
      </div>`;
  }

  // ============ PHOTO GALLERY ============

  function buildPhotoGallery(photos, title) {
    if (!photos || !photos.length) return '';
    const imgs = photos
      .map(src => `<img src="${src}" alt="${title}" loading="lazy">`)
      .join('');
    return `
      <div class="milestone-media">
        <div class="photo-grid">${imgs}</div>
      </div>`;
  }

  // ============ MAIN BUILDER ============

  function buildMediaHTML(milestone) {
    const { type, url, photos, title } = milestone;

    switch (type) {
      case 'youtube': {
        const id = extractYouTubeId(url);
        return id ? buildYouTubeThumbnail(id, title || '') : '';
      }
      case 'spotify':
        return buildSpotifyEmbed(url);
      case 'photo':
        return buildPhotoGallery(photos, title || '');
      default:
        return '';
    }
  }

  // Public API
  return { buildMediaHTML, openYouTubePlayer, extractYouTubeId, convertSpotifyUrl };

})();

// Make openYouTube globally accessible (used by timeline.js onclick)
window.MediaEmbed = MediaEmbed;