// Used example from https://developers.google.com/web/fundamentals/primers/service-workers/ as reference

var CACHE_NAME = 'restaurant-site-cache-v1';
var cacheItems = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/registerServiceWorker.js',
    '/js/restaurant_info.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log(`Opened cache: ${CACHE_NAME}`);
            return cache.addAll(cacheItems);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(response => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});

self.addEventListener('activate', event => {
    var cacheWhiteList = ['restaurant-site-cache-v1'];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});