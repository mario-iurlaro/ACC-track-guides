// ACC Track Guides — Service Worker
// Bump the version string any time you want to force a cache refresh
const CACHE = 'acc-guides-v1';

// Files to cache immediately on install
const PRECACHE = [
  './index.html',
  './data.js',
  './manifest.json'
];

// ── Install: cache core files ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: remove old caches ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for same-origin assets, network-first for everything else ──
self.addEventListener('fetch', e => {
  // Only handle GET requests
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;

      return fetch(e.request)
        .then(response => {
          // Cache any successful same-origin response (images, etc.)
          if (response.ok && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (e.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
