// Cache versioning - update this when you deploy new version
const CACHE_VERSION = "v2";
const STATIC_CACHE = `talent-nest-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `talent-nest-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `talent-nest-images-${CACHE_VERSION}`;

// Core static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/Logo/newlogo.png",
  "/Logo/newlogodark.png",
  "/Logo/newlogodark1.png",
];

// Maximum cache size (in number of items)
const MAX_DYNAMIC_CACHE_SIZE = 50;
const MAX_IMAGE_CACHE_SIZE = 30;

// Helper: Check if response is valid for caching
const isValidResponse = (response) => {
  return response && response.status === 200 && response.type === "basic";
};

// Helper: Check if request should be cached
const shouldCache = (url) => {
  const urlObj = new URL(url);
  // Don't cache external resources (except images)
  if (
    !urlObj.origin.includes(self.location.origin) &&
    !url.includes("cloudinary") &&
    !url.includes("razorpay")
  ) {
    return false;
  }
  return true;
};

// Helper: Clean old cache entries (LRU-like)
const cleanCache = async (cacheName, maxSize) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxSize) {
    // Delete oldest entries (simple approach)
    const toDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(toDelete.map((key) => cache.delete(key)));
  }
};

// INSTALL EVENT - Cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  
  // Skip waiting to activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        // Use addAll but handle failures gracefully
        return Promise.allSettled(
          STATIC_ASSETS.map((asset) =>
            cache.add(asset).catch((err) => {
              console.warn(`Failed to cache ${asset}:`, err);
            })
          )
        );
      })
      .catch((err) => {
        console.error("Service Worker: Install failed", err);
      })
  );
});

// ACTIVATE EVENT - Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== IMAGE_CACHE &&
                !cacheName.includes(CACHE_VERSION)
            )
            .map((cacheName) => {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
      .catch((err) => {
        console.error("Service Worker: Activation failed", err);
      })
  );
});

// FETCH EVENT - Handle all network requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip caching for:
  // - Vite dev server resources
  // - External scripts (Razorpay, etc.)
  // - API calls that shouldn't be cached (auth, etc.)
  if (
    url.pathname.startsWith("/@vite") ||
    url.pathname.includes("node_modules") ||
    url.pathname.includes("@react-refresh") ||
    url.hostname === "checkout.razorpay.com" ||
    url.pathname.includes("/api/v1/user/") ||
    url.pathname.includes("/api/v1/application/apply")
  ) {
    return; // Let browser handle normally
  }

  // Handle API requests (Network First Strategy)
  if (url.pathname.startsWith("/api/v1/")) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle images (Cache First Strategy)
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)
  ) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
    return;
  }

  // Handle static assets (JS, CSS, fonts) - Cache First
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font" ||
    url.pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/i)
  ) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    return;
  }

  // Handle navigation requests (SPA routing) - Network First with fallback
  if (request.mode === "navigate") {
    event.respondWith(navigationStrategy(request));
    return;
  }

  // Default: Cache First for other static assets
  event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
});

// Network First Strategy - Good for API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    // Only cache successful responses
    if (isValidResponse(networkResponse) && shouldCache(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      const clonedResponse = networkResponse.clone();
      
      // Clean cache if too large
      await cleanCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
      
      cache.put(request, clonedResponse).catch((err) => {
        console.warn("Failed to cache API response:", err);
      });
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // If it's a navigation request and we have no cache, return offline page
    if (request.mode === "navigate") {
      return caches.match("/index.html");
    }

    // Return error response
    return new Response("Network error and no cache available", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// Cache First Strategy - Good for static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Update cache in background (stale-while-revalidate)
      fetch(request)
        .then((networkResponse) => {
          if (isValidResponse(networkResponse) && shouldCache(request.url)) {
            caches.open(cacheName).then((cache) => {
              cache.put(request, networkResponse.clone());
            });
          }
        })
        .catch(() => {
          // Network failed, but we have cache, so it's fine
        });

      return cachedResponse;
    }

    // Not in cache, fetch from network
    const networkResponse = await fetch(request);

    if (isValidResponse(networkResponse) && shouldCache(request.url)) {
      const cache = await caches.open(cacheName);
      
      // Clean cache if too large (for images)
      if (cacheName === IMAGE_CACHE) {
        await cleanCache(IMAGE_CACHE, MAX_IMAGE_CACHE_SIZE);
      }
      
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("Cache First Strategy failed:", error);
    
    // If it's an image, return a placeholder or empty response
    if (request.destination === "image") {
      return new Response("", { status: 404 });
    }

    return new Response("Resource not available", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

// Navigation Strategy - For SPA routing
async function navigationStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (isValidResponse(networkResponse)) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, return cached index.html (SPA fallback)
    const cachedPage = await caches.match("/index.html");
    
    if (cachedPage) {
      return cachedPage;
    }

    // Last resort: return basic HTML
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Job Portal</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <h1>You're offline</h1>
          <p>Please check your internet connection and try again.</p>
        </body>
      </html>
    `,
      {
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}