const CACHE_NAME = 'my-cache-v1';
const API_BASE_URL = 'https://bando-radio-api.p.rapidapi.com';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other URLs to cache here
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Check if the request is for the API
  if (request.url.startsWith(API_BASE_URL)) {
    event.respondWith(handleAPICache(request));
  } else {
    event.respondWith(
      caches.match(request)
        .then((response) => response || fetch(request))
    );
  }
});

async function handleAPICache(request) {
  // Attempt to fetch the latest data from the network
  const networkResponse = await fetch(request);

  // If the fetch was successful, update the cache
  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
  }

  // Return the network response to the browser
  return networkResponse;
}