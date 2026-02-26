// ACC Track Guides — Service Worker
// index.html + data.js: always fetched fresh with cache-busting timestamp
// Images/fonts: cache-first for instant offline loading

const CACHE = 'acc-guides-assets-v1';

const NEVER_CACHE = ['index.html', 'data.js', 'sw.js', 'manifest.json'];

function isNeverCache(url) {
  return NEVER_CACHE.some(f => url.pathname.endsWith(f));
}

// ── Install: activate immediately ──
self.addEventListener('install', () => self.skipWaiting());

// ── Activate: clean up old caches and take control ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  if (isNeverCache(url)) {
    // Append a timestamp to bust both the SW cache AND GitHub Pages' HTTP cache
    const bustUrl = new URL(e.request.url);
    bustUrl.searchParams.set('_cb', Date.now());
    e.respondWith(
      fetch(bustUrl.toString(), { cache: 'no-store' })
        .catch(() => {
          // Offline fallback: serve index.html from cache if we have it
          if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
            return caches.match('index.html');
          }
        })
    );
    return;
  }

  // Images, fonts, icons: cache-first, refresh in background
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(response => {
          if (response.ok) cache.put(e.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
