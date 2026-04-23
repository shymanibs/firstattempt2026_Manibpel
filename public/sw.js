const CACHE_NAME = "addu-nation-v1";

// Pre-cache only the stable files
const PRECACHE_URLS = [
  "/firstattempt2026_Manibpel/",
  "/firstattempt2026_Manibpel/index.html",
  "/firstattempt2026_Manibpel/manifest.json",
  "/firstattempt2026_Manibpel/icons/icon-192x192.png",
  "/firstattempt2026_Manibpel/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    ).then(() => self.clients.claim())
  );
});

// Cache-first for ALL same-origin requests
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Only handle same-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Check cache first
      const cached = await cache.match(event.request);
      if (cached) return cached;

      // Not in cache — fetch from network and store it
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse.ok) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      } catch {
        // Offline and not cached — serve index.html as fallback
        const fallback = await cache.match(
          "/firstattempt2026_Manibpel/index.html"
        );
        return fallback || new Response("Offline", { status: 503 });
      }
    })
  );
});