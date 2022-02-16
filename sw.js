var CACHE_NAME = 'my-site-cache-v4';
var urlsToCache = [
 'index.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
	  caches.match(event.request)
		.then(function(response) {
		  // Cache hit - return response
		  if (response) {
			return response;
		  }
		  return fetch(event.request);
		}
	  )
	);
  });

  self.addEventListener('activate', function(event) {

	var cacheAllowlist = [CACHE_NAME];
  
	event.waitUntil(
		caches.keys()
				.then(function(keyList){
				return Promise.all(keyList.map(function(key){
					if (key !== CACHE_NAME){
						console.log('[Service Worker] Removing old cache.', key);
						return caches.delete(key);
					}
				}));
				})
	);
  });

