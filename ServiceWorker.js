const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/bf4ad650adb7c2092964fde1b55bde8b.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/781b98ae2cd5e283163d660c54caf649.data",
    "Build/b3604aa74ac851d7913cd26c84d7f712.wasm",
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
