// Курс валют: сервис-воркер. Сначала сеть, при её отсутствии — сохранённая копия.
const V='kurs-v3';
const FILES=['./','index.html','banner.jpg','kurs.webmanifest','kurs-icon-180.png','kurs-icon-192.png','kurs-icon-512.png','flag-RUB.png','flag-GBP.png','flag-USD.png','flag-EUR.png','flag-AED.png','flag-AMD.png','flag-TRY.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(x=>x||caches.match('index.html'))));
});
