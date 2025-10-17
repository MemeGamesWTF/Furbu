const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/43fb6d635cfd66311e1e8e845acebd27.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/1ecc6959e0f1eb496e127a5fcd8601c2.data",
    "Build/c1b0ca2936bd9de2575935c57e0e2268.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
