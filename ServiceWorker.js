const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/df5ca10a51decc1d3df775e6f77e943a.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/c20ba33b29a45b72fec1499082d6b635.data",
    "Build/8c43badc12f02223b2a17bec32d771c2.wasm",
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
