const cacheName = "v1";

//call the install event
self.addEventListener("install", (e) => {
  console.log("Service worker installed");
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
//enable loading site on offline mode
self.addEventListener("fetch", (e) => {
  console.log("Service worker: fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        //make copy/ clone of response
        const resClone = res.clone();
        //open cache
        caches.open(cacheName).then((cache) => {
          //Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
