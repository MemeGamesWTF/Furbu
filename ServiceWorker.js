const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/e2197b9325093a171c5fe777a4ade420.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/801c3c34a2a8489600d3401b34eb1da6.data",
    "Build/e271753214210dc1cc3844b9e7253f7f.wasm",
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
