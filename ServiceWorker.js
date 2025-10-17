const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/c456c6cb7f4ca9917dba4b6f4e0f0505.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/ce37539a9728d0198025cc01e4aa0d13.data",
    "Build/ce967f26d95e6a77539f7ef069e9c221.wasm",
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
