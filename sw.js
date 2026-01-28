const CACHE_NAME = 'empire-v2';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/war-room-logo.png',
  '/intro.mp3',
  '/verified.mp3'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// Fetch Strategy: Network First, then Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});