const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/15f4cf40f1a9a1863583d51cedf0dc08.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/c64a1bfee93b79bf1ab5a4a8b8b48770.data",
    "Build/642edce2e97894150e0d8cd245e1bcc2.wasm",
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
