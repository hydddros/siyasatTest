const CACHE_NAME = 'siyasatph-v2'; // Changed to v2 to force an update

const ASSETS = [
  '/siyasatTest/',
  '/siyasatTest/index.html',
  '/siyasatTest/manifest.json',
  '/siyasatTest/icons/icon-192.png', // Add this
  '/siyasatTest/icons/icon-512.png'  // Add this
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS);
      })
      .catch(err => console.error('Cache Fail:', err)) // This will tell you if a file is missing
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
