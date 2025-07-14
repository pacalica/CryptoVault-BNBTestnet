const CACHE_NAME = "safe-crypto-vault-v1";
const urlsToCache = [
  "index.html",
  "dashboard.html",
  "style.css",
  "script.js",
  "manifest.json",
  "bg-robot.jpg",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Instalare service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activare service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Interceptare cereri
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
