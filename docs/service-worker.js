const CACHE_NAME = 'cryptovault-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './script.js',
  './abi.json',
  './style.css',
  './manifest.json',
  './icon.png'
];

// Instalare service worker și cache-uire fișiere
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activare și curățare cache vechi
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Interceptarea cererilor
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
