// ACC Track Guides — Service Worker
// Strategy: network-first for HTML + data.js (always get latest),
// cache-first for images (they rarely change, big files).
// Bump CACHE_VERSION any time you want to force a full refresh.
const CACHE_VERSION = 'v3';
const CACHE = 'acc-guides-' + CACHE_VERSION;

const ALWAYS_FRESH = [
  './index.html',
  './data.js',
  './manifest.json',
  './sw.js'
];

// ── Install: pre-cache the core files ──
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ALWAYS_FRESH))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: delete any old caches ──
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const filename = url.pathname.split('/').pop();
  const isCore = ALWAYS_FRESH.some(f => url.pathname.endsWith(f.replace('./', '/')));
  const isImage = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(filename);

  if (isCore) {
    // Network-first: try to get the latest from GitHub,
    // fall back to cache if offline.
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );

  } else if (isImage) {
    // Cache-first for images: serve instantly from cache,
    // but fetch + update cache in background (stale-while-revalidate).
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

  } else {
    // Everything else: network with cache fallback
    e.respondWith(
      fetch(e.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  }
});

// ── Tell all open tabs to reload when a new SW takes over ──
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

