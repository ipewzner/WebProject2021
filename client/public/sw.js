const cacheName = "V1";

let cacheAssets = [
    '/',
    '/static/js/bundle.js',
    '/static/js/vendors~main.chunk.js',
    '/static/js/main.chunk.js',
    '/manifest.json',
    'favicon.ico'
];

this.addEventListener("install", e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => cache.addAll(cacheAssets))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e =>{
    e.waitUntil(
        caches.keys().then(cacheName=>{
            return Promise.all(
                cacheName.map(cache=>{
                    if(cache != cacheName){
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

this.addEventListener("fetch", (e) => {
    if (!navigator.onLine) {
        e.respondWith(
            caches.match(e.request).then((res) => {
                if (res) return res;
                let requestUrl = e.request.clone();
                fetch(requestUrl)
            })
        )
    }

})