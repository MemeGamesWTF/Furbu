const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/d052d1e49e0141b0b7fff29c1015e11b.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/f6da8d361a222aa984a66254ff1e2967.data",
    "Build/231b0932f544390ca54e3826f3e21c8c.wasm",
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
