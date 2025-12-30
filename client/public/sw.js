// Simple service worker - only caches index.html and shows offline page when network fails

const CACHE_NAME = "talnet-nest-v4";
const OFFLINE_URL = "/offline";

// Install - Cache index.html and manifest
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(["/", "/index.html", "/manifest.json"]);
      })
      .catch((err) => {
        console.error("Service Worker: Install failed", err);
      })
  );
});

// Activate - Clean old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch - Handle network requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip Vite dev server files in development
  if (
    url.pathname.startsWith("/@vite") ||
    url.pathname.includes("node_modules") ||
    url.pathname.includes("@react-refresh") ||
    url.pathname.startsWith("/src/") ||
    url.pathname === "/env.js" || // Generated at runtime
    url.pathname.startsWith("/PWA_Assets/") // PWA assets from manifest
  ) {
    return; // Let browser handle normally
  }

  // Skip external resources
  if (url.hostname !== self.location.hostname) {
    return; // Let browser handle normally
  }

  // Handle navigation requests (page loads)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Network succeeded, return response
          return response;
        })
        .catch(() => {
          // Network failed - serve offline page directly
          // Don't serve cached index.html because React won't load offline in dev mode
          return new Response(
            `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Offline - Job Portal</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Poppins', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #18181b;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .container {
        max-width: 500px;
      }
      h1 { 
        font-size: 2.5rem; 
        margin-bottom: 1rem; 
        font-weight: 700;
      }
      p { 
        font-size: 1.1rem; 
        color: #a1a1aa; 
        margin-bottom: 2rem; 
        line-height: 1.6;
      }
      button {
        padding: 14px 28px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      button:hover { 
        background: #2563eb; 
      }
      button:active {
        transform: scale(0.98);
      }
      .icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="icon">📡</div>
      <h1>You're Offline</h1>
      <p>Your network connection is off. Please check your internet connection and try again.</p>
      <button onclick="window.location.reload()">Retry Connection</button>
    </div>
  </body>
</html>`,
            {
              headers: { 
                "Content-Type": "text/html",
                "Cache-Control": "no-cache"
              },
            }
          );
        })
    );
    return;
  }

  // For JS, CSS, and other assets - Cache them when fetched successfully
  if (
    url.pathname.match(/\.(js|css|woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg|webp|ico)$/i) ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    request.destination === "image"
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache - ALWAYS return a valid Response
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, return empty 404 response (prevents TypeError)
            return new Response("", { 
              status: 404, 
              statusText: "Not Found" 
            });
          });
        })
    );
    return;
  }

  // For other requests, try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        // ALWAYS return a valid Response, never undefined
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return empty 404 if not in cache
          return new Response("", { 
            status: 404, 
            statusText: "Not Found" 
          });
        });
      })
  );
});