const CACHE_NAME = "talent-nest-static-v1";
const DYNAMIC_CACHE = "talent-nest-dynamic-v1";

const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  console.log("SW: Install");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("SW: Active");
  event.waitUntil(
    caches
      .keys()
      .then((key) =>
        Promise.all(
          key
            .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  // Only cache GET requests
  if (request.method !== "GET") return;

  // 1. IGNORE VITE & HMR: Let these pass through to the network only
  if (
    url.pathname.startsWith("/@vite") ||
    url.pathname.includes("node_modules") ||
    url.pathname.includes("@react-refresh")
  ) {
    return;
  }

  // API Caching (Network First)
  if (request.url.includes("/api/v1/job")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, cloned);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets (Cache First)
  event.respondWith(
    caches
      .match(request)
      .then((cached) => {
        return cached || fetch(request);
      })
      .catch(() => console.log(request))
  );
});
