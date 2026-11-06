// Horario de funcionamento: selo "Aberto agora / Fechado" na pagina inicial
// e uma janela com a tabela da semana.
// Para mudar os horarios, edite so o bloco HORARIOS logo abaixo.
(function () {
    'use strict';

    // Dias: 0 = domingo, 1 = segunda ... 6 = sabado. Horas no formato "HH:MM".
    // fechado: true = nao abre nesse dia.
    // retirada: true = nesse dia so atende retirada no local (sem delivery).
    // Se fecha depois da meia-noite, escreva a hora normal (ex.: fecha: "01:00" = 1h da madrugada seguinte).
    var HORARIOS = {
        fuso: 'America/Sao_Paulo',
        ordemNaTabela: [1, 2, 3, 4, 5, 6, 0],
        dias: {
            0: { nome: 'Domingo',       curto: 'domingo',  abre: '09:00', fecha: '20:00' },
            1: { nome: 'Segunda-feira', curto: 'segunda',  retirada: true },
            2: { nome: 'Ter\u00e7a-feira',   curto: 'ter\u00e7a',    retirada: true },
            3: { nome: 'Quarta-feira',  curto: 'quarta',   abre: '17:00', fecha: '22:00' },
            4: { nome: 'Quinta-feira',  curto: 'quinta',   abre: '17:00', fecha: '22:00' },
            5: { nome: 'Sexta-feira',   curto: 'sexta',    abre: '17:00', fecha: '01:00' },
            6: { nome: 'S\u00e1bado',        curto: 's\u00e1bado',   abre: '09:00', fecha: '01:00' }
        }
    };

    var MIN_DIA = 1440;
    var MIN_SEMANA = 7 * MIN_DIA;
    var DIAS_INGLES = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    var chip = document.getElementById('horario-chip');
    if (!chip) return;

    function paraMinutos(hhmm) {
        var p = hhmm.split(':');
        return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
    }

    // Dia da semana e minutos desde 00:00 no fuso da loja (nao depende do relogio do cliente)
    function agoraNaLoja() {
        try {
            var partes = new Intl.DateTimeFormat('en-US', {
                timeZone: HORARIOS.fuso, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
            }).formatToParts(new Date());
            var o = {};
            partes.forEach(function (p) { o[p.type] = p.value; });
            if (DIAS_INGLES[o.weekday] === undefined) throw new Error('dia');
            return { dia: DIAS_INGLES[o.weekday], min: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
        } catch (e) {
            var d = new Date();
            return { dia: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
        }
    }

    // Cada turno vira um intervalo na semana (em minutos desde domingo 00:00)
    function turnos() {
        var lista = [];
        for (var d = 0; d < 7; d++) {
            var c = HORARIOS.dias[d];
            if (!c || c.fechado || c.retirada) continue;
            var ini = paraMinutos(c.abre);
            var fim = paraMinutos(c.fecha);
            if (fim <= ini) fim += MIN_DIA; // passa da meia-noite
            lista.push({ dia: d, ini: d * MIN_DIA + ini, fim: d * MIN_DIA + fim, abre: c.abre, fecha: c.fecha });
        }
        return lista;
    }

    function calcularEstado() {
        var ag = agoraNaLoja();
        var agora = ag.dia * MIN_DIA + ag.min;
        var lista = turnos();
        var i, t, proximo = null, menorEspera = Infinity;

        for (i = 0; i < lista.length; i++) {
            t = lista[i];
            // testa "agora" e "agora + 1 semana" (turno de sabado que termina no domingo)
            if (agora >= t.ini && agora < t.fim) return { aberto: true, restante: t.fim - agora, fecha: t.fecha, hoje: ag.dia };
            if (agora + MIN_SEMANA >= t.ini && agora + MIN_SEMANA < t.fim) return { aberto: true, restante: t.fim - (agora + MIN_SEMANA), fecha: t.fecha, hoje: ag.dia };
        }

        for (i = 0; i < lista.length; i++) {
            t = lista[i];
            var espera = t.ini - agora;
            if (espera <= 0) espera += MIN_SEMANA;
            if (espera < menorEspera) { menorEspera = espera; proximo = t; }
        }
        var configHoje = HORARIOS.dias[ag.dia] || {};
        if (!proximo) return { aberto: false, hoje: ag.dia, retirada: !!configHoje.retirada, quando: '', abre: '' };

        var quando;
        if (proximo.dia === ag.dia && menorEspera < MIN_DIA) quando = 'hoje';
        else if (proximo.dia === (ag.dia + 1) % 7 && menorEspera < 2 * MIN_DIA) quando = 'amanh\u00e3';
        else quando = HORARIOS.dias[proximo.dia].curto;
        return { aberto: false, hoje: ag.dia, retirada: !!configHoje.retirada, quando: quando, abre: proximo.abre };
    }

    function descrever(e) {
        if (e.aberto) {
            if (e.restante <= 30) return { tipo: 'fechando', texto: 'Fecha em ' + e.restante + ' min' };
            return { tipo: 'aberto', texto: 'Aberto agora \u00b7 at\u00e9 ' + e.fecha };
        }
        if (e.retirada) return { tipo: 'retirada', texto: 'Hoje: somente retirada' };
        if (!e.abre) return { tipo: 'fechado', texto: 'Fechado no momento' };
        return { tipo: 'fechado', texto: 'Fechado \u00b7 abre ' + e.quando + ' \u00e0s ' + e.abre };
    }

    // ---------- janela com a tabela da semana ----------
    var modal = document.createElement('div');
    modal.className = 'horario-overlay';
    modal.id = 'horario-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'horario-titulo');
    modal.innerHTML =
        '<div class="horario-box">' +
            '<div class="horario-topo">' +
                '<h2 class="horario-titulo" id="horario-titulo">' +
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>' +
                    'Hor\u00e1rio de funcionamento' +
                '</h2>' +
                '<button type="button" class="close-btn" id="horario-fechar" aria-label="Fechar">\u2715</button>' +
            '</div>' +
            '<p class="horario-status" id="horario-status"></p>' +
            '<ul class="horario-lista" id="horario-lista"></ul>' +
        '</div>';
    document.body.appendChild(modal);

    var elTexto = document.getElementById('horario-chip-texto');
    var elStatus = document.getElementById('horario-status');
    var elLista = document.getElementById('horario-lista');
    var botaoFechar = document.getElementById('horario-fechar');
    var focoAnterior = null;

    function atualizar() {
        var e = calcularEstado();
        var d = descrever(e);

        chip.hidden = false;
        chip.className = 'horario-chip ' + d.tipo;
        if (elTexto) elTexto.textContent = d.texto;
        elStatus.textContent = d.texto;
        elStatus.className = 'horario-status ' + d.tipo;

        var html = '';
        HORARIOS.ordemNaTabela.forEach(function (n) {
            var c = HORARIOS.dias[n];
            var ehHoje = n === e.hoje;
            var horas = c.retirada ? 'Somente retirada' : (c.fechado ? 'Fechado' : c.abre + ' \u00e0s ' + c.fecha);
            html += '<li class="horario-linha' + (ehHoje ? ' hoje' : '') + (c.fechado ? ' fechado' : '') + (c.retirada ? ' retirada' : '') + '">' +
                '<span class="horario-dia">' + c.nome + (ehHoje ? '<span class="horario-hoje-tag">Hoje</span>' : '') + '</span>' +
                '<span class="horario-horas">' + horas + '</span></li>';
        });
        elLista.innerHTML = html;
    }

    function abrir() {
        atualizar();
        focoAnterior = document.activeElement;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        botaoFechar.focus();
    }

    function fechar() {
        if (!modal.classList.contains('open')) return;
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
        if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
    }

    chip.addEventListener('click', abrir);
    botaoFechar.addEventListener('click', fechar);
    modal.addEventListener('click', function (ev) { if (ev.target === modal) fechar(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') fechar(); });

    atualizar();
    setInterval(atualizar, 30000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) atualizar(); });
})();
