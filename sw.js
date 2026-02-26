const CACHE_NAME = 'afrokodica-os-v3.8';
const urlsToCache = [
  './',
  './index.html',
  './manifesto.html',
  './manifest.json'
];

// Instalação do Motor Offline
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('KÓDEX: Arquivos selados no cache local.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação de Rede (Para velocidade e modo offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se existir, senão busca na rede
        return response || fetch(event.request);
      })
  );
});

// Limpeza de Caches Antigos (Evolução Contínua)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});