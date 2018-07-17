var staticCacheName = 'mwsRestaurantApp-001';
let filesToCache = [
  'index.html',
  'restaurant.html',
  'sw.js',
  'js/main.js',
  'js/restaurant_info.js',
  'js/sw_register.js',
  'css/styles.css',
  '/restaurant.html?id=1',
  '/restaurant.html?id=2',
  '/restaurant.html?id=3',
  '/restaurant.html?id=4',
  '/restaurant.html?id=5',
  '/restaurant.html?id=6',
  '/restaurant.html?id=7',
  '/restaurant.html?id=8',
  '/restaurant.html?id=9',
  '/restaurant.html?id=10',
  '/data/restaurants.json',
];

this.addEventListener('install', event => {
  console.log('service worker installed');
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        console.log('serviceWorker is now caching ...');
        return cache.addAll(filesToCache);
      })
      .catch(error => {
        console.log('Caches open failed: ' + error);
      })
  );
});

this.addEventListener('activate', event => {
  console.log('Activating new service worker ...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(
            cacheName =>
              cacheName.startsWith('mwsRestaurantApp-') &&
              cacheName != staticCacheName
          )
          .map(cacheName => caches.delete(cacheName))
      )
        .then(() => {
          console.log('New service worker in now actived!');
        })
        .catch(() => {
          console.log('New service worker failed to be activated!');
        });
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(response => {
        return (
          response ||
          fetch(event.request).then(fetchResponse => {
            return caches.open(staticCacheName).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch(error => {
        if (event.request.url.includes('.jpg')) {
          return caches.match('/img/fixed/offline_img1.png');
        }
        return new Response('Not connected to the internet', {
          status: 404,
          statusText: 'Not connected to the internet',
        });
      })
  );
});

this.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    this.skipWaiting();
  }
});

this.addEventListener('sync', event => {
  if (event.tag === 'review-sync') {
    event.waitUntil(IDBHelper.syncOfflineReviews());
  }
});
