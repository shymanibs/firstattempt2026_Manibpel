// sw.js — ADDU Nation Service Worker
// Strategy: Cache-First for static assets, Network-First for navigation

const CACHE_NAME = "addu-nation-v1";

// Static assets to pre-cache on install
const PRECACHE_URLS = [
  "/firstattempt2026_Manibpel/",
  "/firstattempt2026_Manibpel/index.html",
  "/firstattempt2026_Manibpel/manifest.json",
  "/firstattempt2026_Manibpel/favicon.svg",
  "/firstattempt2026_Manibpel/icon-192x192.png",
  "/firstattempt2026_Manibpel/icon-512x512.png",
];

// File extensions that always use cache-first
const STATIC_EXTENSIONS = [
  ".js",
  ".css",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".woff",
  ".woff2",
  ".ttf",
];

// ── Install: pre-cache known shell assets ────────────────────────────────────

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: purge old caches ───────────────────────────────────────────────

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── Fetch: route requests by strategy ───────────────────────────────────────

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  const isStaticAsset = STATIC_EXTENSIONS.some((ext) =>
    url.pathname.endsWith(ext)
  );

  if (isStaticAsset) {
    // Cache-First: serve from cache, fall back to network and update cache
    event.respondWith(cacheFirst(request));
  } else {
    // Network-First: for HTML navigation, try network then fall back to cache
    event.respondWith(networkFirst(request));
  }
});

// ── Strategy: Cache-First ────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Return a fallback for images if completely offline
    return new Response("", { status: 408, statusText: "Offline" });
  }
}

// ── Strategy: Network-First ──────────────────────────────────────────────────

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Last resort: serve the app shell so SolidJS routing still works offline
    const shell = await caches.match("/index.html");
    return shell || new Response("Offline", { status: 503 });
  }
}