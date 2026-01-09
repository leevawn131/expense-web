const CACHE = "expense-v1";
const ASSETS = [
  "index.html",
  "add.html",
  "day.html",
  "week.html",
  "month.html",
  "style.css",
  "app.js",
  "week.js",
  "month.js",
  "manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
