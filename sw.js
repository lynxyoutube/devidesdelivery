// Service worker do Devides Delivery
// - Fotos: ficam guardadas no celular (abrem na hora e funcionam com internet ruim)
// - Site (html/css/js): tenta a internet primeiro; se demorar ou cair, usa a copia guardada
const VERSAO = 'v1';
const CACHE_FOTOS = 'devides-fotos-' + VERSAO;
const CACHE_SITE = 'devides-site-' + VERSAO;
const TEMPO_LIMITE_MS = 4000;

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_SITE).then(function (cache) {
            return cache.addAll(['./', 'logo.jpg']).catch(function () {});
        }).then(function () { return self.skipWaiting(); })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (nomes) {
            return Promise.all(nomes.filter(function (n) {
                return n.indexOf('devides-') === 0 && n !== CACHE_FOTOS && n !== CACHE_SITE;
            }).map(function (n) { return caches.delete(n); }));
        }).then(function () { return self.clients.claim(); })
    );
});

function ehFoto(url) {
    return url.pathname.indexOf('/imagens/') !== -1 || /logo\.jpg$/.test(url.pathname);
}

// Fotos: mostra a copia guardada na hora e atualiza em segundo plano
function fotos(request) {
    return caches.open(CACHE_FOTOS).then(function (cache) {
        return cache.match(request).then(function (guardada) {
            var rede = fetch(request).then(function (resp) {
                if (resp && resp.status === 200) { cache.put(request, resp.clone()); }
                return resp;
            }).catch(function () { return guardada; });
            return guardada || rede;
        });
    });
}

// Site: internet primeiro (com limite de tempo), copia guardada como plano B
function site(request) {
    return caches.open(CACHE_SITE).then(function (cache) {
        var controle = new AbortController();
        var timer = setTimeout(function () { controle.abort(); }, TEMPO_LIMITE_MS);
        return fetch(request, { signal: controle.signal }).then(function (resp) {
            clearTimeout(timer);
            if (resp && resp.status === 200) { cache.put(request, resp.clone()); }
            return resp;
        }).catch(function () {
            clearTimeout(timer);
            return cache.match(request).then(function (guardada) {
                return guardada || cache.match(request, { ignoreSearch: true });
            }).then(function (guardada) {
                return guardada || cache.match('./');
            });
        });
    });
}

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method !== 'GET') { return; }
    var url = new URL(request.url);
    if (url.origin !== self.location.origin) { return; }
    if (ehFoto(url)) {
        event.respondWith(fotos(request));
    } else {
        event.respondWith(site(request));
    }
});