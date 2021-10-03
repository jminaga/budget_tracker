const cacheName = 'my-app-cache';
const dataCache = 'my-cache-data';
const contentToCache = [
    '/',
    '/index.js',
    '/service-worker.js',
    '/index.html',
    '/db.js',
    '/styles.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Installation

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
      })());
  });

  //Respond to Fetches

//   self.addEventListener('fetch', (e) => {
//     console.log(`[Service Worker] Fetched resource ${e.request.url}`);
//   });


  self.addEventListener('fetch', (e) => {
    // there is an if statement that checks to see if there is an api endpoint to activate
    // this if statement is the last piece before this is complete


    if (e.request.url.includes('/api/')) {
        console.log('[Service Worker Fetch(data)', e.request.url);
    }



    self.addEventListener('fetch', (event) => {
      e.respondWith(
          fetch(e.request).catch(() =>{
              return caches.match(event.r).then((res) => {
                  if (res) {
                      return res;
                  }else if (e.request.headers.get("accept").includes("text/html")){
                      return caches.match("/index.html");
                  }
              });
          })
      );


    // e.respondWith((async () => {
    //   const r = await caches.match(e.request);
    //   console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    //   if (r) { return r; }
    //   const response = await fetch(e.request);
    //   const cache = await caches.open(cacheName);
    //   if(!(e.request.url.indexOf('http') === 0)){
    //     //skip request
    //  }
    //   console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    //   cache.put(e.request, response.clone());
    //   return response;
    // })());

    
    // e.respondWith(
    //   caches.open(cacheName).then( cache => {
    //     return cache.match(e.request).then(response => {
    //       return response  || fetch(e.request);
    //     })
    //   })
    // );
  });

})

  // Figure out how to cache incoming information from user.
  // Another self.eventlistener code block
  // will be fetch instead of installing
  // how to cache data with a service worker