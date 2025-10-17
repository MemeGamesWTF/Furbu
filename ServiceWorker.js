const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/c456c6cb7f4ca9917dba4b6f4e0f0505.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/622e18fb3bff30c68ebeda502c3ae512.data",
    "Build/f3a1fd44c4bfe9f68127db0f14abb240.wasm",
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
