const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/a98692fa6f03f84b8d96670c9aa54c92.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/2b9948c47881fcca8a57ac4e8b20a4b8.data",
    "Build/78d2a244ecd81b23e67e3f5d3732ccc3.wasm",
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
