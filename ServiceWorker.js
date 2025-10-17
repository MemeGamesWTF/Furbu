const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/54bb7a38eee097c20cd73e7a44d2ac4f.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/c7eda2ef9c33094c268af1139e6e50a0.data",
    "Build/e18a8d959d89550be893b98b94d40fc7.wasm",
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
