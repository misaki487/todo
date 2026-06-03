// Service Worker — 离线缓存 + 安装支持
const CACHE_NAME = 'todo-pwa-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 安装：预缓存核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求拦截：缓存优先，网络回退
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // 缓存命中直接返回
      if (cached) return cached;

      // 请求网络
      return fetch(event.request).then(response => {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(() => {
        // 网络失败，返回离线页面（SPA 场景返回首页）
        return caches.match('./index.html');
      });
    })
  );
});
