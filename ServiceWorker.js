const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/629b751558c2debc4f567fbdf5544ed3.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/fb35f48f5bfb3047b78989b2610e2576.data",
    "Build/a89a2c4ff4933ace5a2ebba05d0e299e.wasm",
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
