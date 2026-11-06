// Efeito de rolagem: categorias, titulos e produtos aparecem suavemente
// conforme entram na tela. Nao mexe em precos, carrinho ou fotos.
// Se o navegador for antigo ou a pessoa preferir menos movimento, nada muda.
(function () {
    'use strict';

    var raiz = document.documentElement;
    var reduzir = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzir || !('IntersectionObserver' in window) || !('MutationObserver' in window)) return;

    var alvo = document.getElementById('loja-conteudo');
    if (!alvo) return;

    var SELETOR = '.secao-topo, .cat-tile, .product-card, .section-title, .loja-vazio';
    var assinaturaAtual = '';
    var jaRevelados = {};
    var observador = null;
    var agendado = false;

    function chave(el) {
        var t = el.querySelector('.product-title, .cat-tile-name, .secao-titulo');
        return (t ? t.textContent : el.textContent).replace(/\s+/g, ' ').trim();
    }

    function revelar(el, atraso) {
        el.style.setProperty('--reveal-delay', atraso + 'ms');
        el.classList.add('in');
        var i = el.getAttribute('data-reveal-i');
        if (i !== null) jaRevelados[i] = true;
    }

    function aoEntrarNaTela(entradas) {
        var visiveis = entradas.filter(function (e) { return e.isIntersecting; });
        // Ordem de leitura: de cima para baixo, da esquerda para a direita
        visiveis.sort(function (a, b) {
            var ra = a.boundingClientRect;
            var rb = b.boundingClientRect;
            var faixa = Math.round(ra.top / 24) - Math.round(rb.top / 24);
            return faixa !== 0 ? faixa : ra.left - rb.left;
        });
        visiveis.forEach(function (e, i) {
            revelar(e.target, Math.min(i, 7) * 70);
            observador.unobserve(e.target);
        });
    }

    function processar() {
        agendado = false;
        observador.disconnect();

        var itens = alvo.querySelectorAll(SELETOR);
        var campo = document.getElementById('search-input');
        var buscando = !!(campo && campo.value.trim());

        // Mesma tela renderizada de novo (ex.: clicou em "+ Adicionar"): nao anima de novo
        var assinatura = Array.prototype.map.call(itens, chave).join('|');
        if (assinatura !== assinaturaAtual) {
            assinaturaAtual = assinatura;
            jaRevelados = {};
        }

        Array.prototype.forEach.call(itens, function (el, i) {
            el.classList.add('reveal');
            el.setAttribute('data-reveal-i', i);
            if (buscando || jaRevelados[i]) {
                el.classList.add('reveal-ja');
            } else {
                observador.observe(el);
            }
        });
    }

    function agendar() {
        if (agendado) return;
        agendado = true;
        window.requestAnimationFrame(processar);
    }

    try {
        observador = new IntersectionObserver(aoEntrarNaTela, {
            threshold: 0.1,
            rootMargin: '0px 0px -6% 0px'
        });
        new MutationObserver(agendar).observe(alvo, { childList: true });
        raiz.classList.add('motion');
        processar();
    } catch (erro) {
        raiz.classList.remove('motion');
    }
})();
