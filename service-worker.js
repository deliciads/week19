var chacheName = 'petstore-v1';
var cacheFiles = [
    'petstore.html',
    'product.js',
    'petstore.webmanifest',
    'images/cat-food.jpg',
    'images/yarn.jpg',
    'images/kitten-litter.png',
    'images/cat-house.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

/*self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Sevice Worker] Fetching resource: ' + e.request.url);
            return r
        })
    );
});*/

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (response) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});