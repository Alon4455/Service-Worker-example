const cacheName = "v1";

const cacheAssets = ["index.html", "about.html", "/js/main.js"];

//call the install event
self.addEventListener("install", (e) => {
  console.log("Service worker installed");
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//call the activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("service worker clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service worker: fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
