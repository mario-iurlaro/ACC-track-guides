// ACC Track Guides — Service Worker
// Strategy:
//   index.html + data.js → NETWORK ONLY (always fresh, never cached)
//   everything else (images, fonts, icons) → cache-first with background refresh

const CACHE = 'acc-guides-assets-v1';

// These are NEVER served from cache — always fetched live from GitHub
const NEVER_CACHE = [
  'index.html',
  'data.js',
  'sw.js',
  'manifest.json'
];

function isNeverCache(url) {
  return NEVER_CACHE.some(f => url.pathname.endsWith(f));
}

// ── Install: skip waiting immediately, don't pre-cache anything ──
self.addEventListener('install', e => {
  self.skipWaiting();
});

// ── Activate: take control immediately, clean up old caches ──
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

  // index.html, data.js etc: always go to network, no cache fallback needed
  // (if offline, the browser shows its own offline page — acceptable)
  if (isNeverCache(url)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
    );
    return;
  }

  // Everything else (images, fonts, icons): cache-first, update in background
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(response => {
          if (response.ok) cache.put(e.request, response.clone());
          return response;
        });
        return cached || fetchPromise;
      })
    )
  );
});


