const cacheName = "DefaultCompany-JohnnyVerse-1.0";
const contentToCache = [
    "Build/629b751558c2debc4f567fbdf5544ed3.loader.js",
    "Build/37e945ff90f1545a6e844458b1fc3945.framework.js",
    "Build/4ff6e0fc4942a22212b1b044f235e121.data",
    "Build/00ef0c608d5ebbc2559eecbae51d63bc.wasm",
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
