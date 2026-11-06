// ===================================================
// ESTADO DA APLICAÇÃO
// ===================================================
let carrinho = JSON.parse(localStorage.getItem('adega_carrinho')) || [];
carrinho = carrinho.filter(item => PRODUTOS.some(p => p.id === item.id && !(p.sabores && !item.sabor))); // ignora itens de produtos que nao existem mais (ou que agora exigem sabor)
let grupoAtivo = null; // null = pagina inicial; senao o id de uma categoria principal (CONFIG.grupos)
let subAtiva = null;   // null = todas; senao uma categoria original dentro do grupo (ex.: "longneck")
let termoBusca = '';

// Número e nome da loja vêm sempre do products.js
const whatsappNumero = CONFIG.whatsapp;
const nomeLojaAtual = CONFIG.nomeLoja;

// Categorias principais da vitrine e titulos das categorias originais (subsecoes)
const GRUPOS = CONFIG.grupos || [];
const TITULOS_SECAO = {
    garrafinhas: 'Garrafinhas',
    cervejas: 'Cervejas Lata',
    longneck: 'Long Neck',
    destilados: 'Destilados',
    drinks: 'Drinks Prontos',
    energeticos: 'Energ&eacute;ticos',
    baly: 'Baly',
    monster: 'Monster',
    redbull: 'Red Bull',
    refrigerantes: 'Refrigerantes e &Aacute;gua',
    gelo: 'Gelo',
    combos: 'Combos'
};

// Verificação de idade (+18): 'maior', 'menor' ou null (ainda não respondeu)
const CATEGORIAS_ALCOOLICAS = CONFIG.categoriasAlcoolicas || [];
let respostaIdade = localStorage.getItem('devides_idade');

function liberadoParaVenda(produto) {
    // Quem não confirmou ser maior de 18 só vê o que não é alcoólico
    return respostaIdade === 'maior' || !CATEGORIAS_ALCOOLICAS.includes(produto.categoria);
}

// ===================================================
// INICIALIZAÇÃO
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    // Botão flutuante de WhatsApp (conversa direta com a loja)
    const zapFloat = document.getElementById('whatsapp-float');
    if (zapFloat) {
        const saudacao = encodeURIComponent(`Olá! Vim pelo site da ${nomeLojaAtual} e gostaria de fazer um pedido.`);
        zapFloat.href = `https://wa.me/${whatsappNumero.replace(/\D/g, '')}?text=${saudacao}`;
    }

    // Primeira visita: pergunta a idade antes de mostrar a loja
    if (respostaIdade === null) {
        const gate = document.getElementById('age-gate');
        if (gate) {
            gate.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Botao "voltar" do celular: sai da categoria e volta para a pagina inicial
    try { history.replaceState({ grupo: null, sub: null }, ''); } catch (e) {}
    window.addEventListener('popstate', event => {
        const estado = event.state || {};
        grupoAtivo = estado.grupo || null;
        subAtiva = estado.sub || null;
        renderizarNavegacao();
        renderizarProdutos();
    });

    aplicarRestricaoIdade();
    carregarDadosCliente();
    renderizarNavegacao();
    renderizarProdutos();
    atualizarCarrinhoVisual();
});

// ===================================================
// VERIFICAÇÃO DE IDADE (+18)
// ===================================================
function responderIdade(maiorDeIdade) {
    respostaIdade = maiorDeIdade ? 'maior' : 'menor';
    localStorage.setItem('devides_idade', respostaIdade);

    document.getElementById('age-gate').style.display = 'none';
    document.body.style.overflow = 'auto';

    grupoAtivo = null;
    subAtiva = null;
    aplicarRestricaoIdade();
    renderizarNavegacao();
    renderizarProdutos();
    atualizarCarrinhoVisual();
}

function aplicarRestricaoIdade() {
    const restrito = respostaIdade !== 'maior';

    // Se estava numa categoria bloqueada (alcoolica), volta para a pagina inicial
    const grupo = GRUPOS.find(g => g.id === grupoAtivo);
    if (grupo && !grupoVisivel(grupo)) {
        grupoAtivo = null;
        subAtiva = null;
    }

    // Tira do carrinho qualquer item alcoólico que tenha ficado salvo (só para quem se declarou menor)
    if (respostaIdade === 'menor') {
        const antes = carrinho.length;
        carrinho = carrinho.filter(item => {
            const produto = PRODUTOS.find(p => p.id === item.id);
            return produto && liberadoParaVenda(produto);
        });
        if (carrinho.length !== antes) {
            localStorage.setItem('adega_carrinho', JSON.stringify(carrinho));
        }
    }

    // Ajusta o exemplo da busca para quem não pode ver as alcoólicas
    const busca = document.getElementById('search-input');
    if (busca) {
        busca.placeholder = restrito
            ? 'Buscar: Baly, Coca-Cola, Gelo...'
            : 'Buscar: Baly, Skol, Heineken...';
    }
}

// ===================================================
// DADOS DO CLIENTE (salvos neste aparelho para o próximo pedido)
// ===================================================
const CAMPOS_CLIENTE = {
    nome: 'cliente-nome',
    telefone: 'cliente-telefone',
    rua: 'cliente-rua',
    numero: 'cliente-numero',
    bairro: 'cliente-bairro',
    complemento: 'cliente-complemento'
};

function carregarDadosCliente() {
    try {
        const salvo = JSON.parse(localStorage.getItem('devides_cliente')) || {};
        Object.entries(CAMPOS_CLIENTE).forEach(([chave, idCampo]) => {
            const campo = document.getElementById(idCampo);
            if (campo && salvo[chave]) campo.value = salvo[chave];
        });
    } catch (e) {
        // dados salvos corrompidos: ignora e segue com os campos vazios
    }
}

function salvarDadosCliente(incluirEndereco) {
    try {
        const salvo = JSON.parse(localStorage.getItem('devides_cliente')) || {};
        Object.entries(CAMPOS_CLIENTE).forEach(([chave, idCampo]) => {
            const ehEndereco = ['rua', 'numero', 'bairro', 'complemento'].includes(chave);
            if (ehEndereco && !incluirEndereco) return;
            salvo[chave] = document.getElementById(idCampo).value.trim();
        });
        localStorage.setItem('devides_cliente', JSON.stringify(salvo));
    } catch (e) {
        // sem espaço ou armazenamento bloqueado: o pedido segue normalmente
    }
}

// ===================================================
// CATEGORIAS, NAVEGAÇÃO E BUSCA
// ===================================================
function produtosDaCategoria(categoria) {
    return PRODUTOS.filter(p => p.categoria === categoria && liberadoParaVenda(p));
}

function produtosDoGrupo(grupo) {
    return PRODUTOS.filter(p => grupo.categorias.includes(p.categoria) && liberadoParaVenda(p));
}

// Menores de 18 nao veem categorias principais que sao so de bebida alcoolica
function grupoVisivel(grupo) {
    if (respostaIdade === 'maior') return true;
    return !grupo.categorias.every(c => CATEGORIAS_ALCOOLICAS.includes(c));
}

function gruposVisiveis() {
    return GRUPOS.filter(g => grupoVisivel(g) && (g.mostrarVazio || produtosDoGrupo(g).length > 0));
}

// Busca sem diferenciar maiusculas e acentos ("agua" encontra "Água")
function normalizar(texto) {
    return String(texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function escaparHtml(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatarPreco(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

function irParaTopo() {
    window.scrollTo({ top: 0, behavior: 'auto' });
}

function limparBusca() {
    const campo = document.getElementById('search-input');
    if (campo) campo.value = '';
    termoBusca = '';
}

function selecionarCategoria(idGrupo) {
    limparBusca();
    try { history[grupoAtivo ? 'replaceState' : 'pushState']({ grupo: idGrupo, sub: null }, ''); } catch (e) {}
    grupoAtivo = idGrupo;
    subAtiva = null;
    renderizarNavegacao();
    renderizarProdutos();
    irParaTopo();
}

function selecionarSub(categoria) {
    subAtiva = categoria;
    try { history.replaceState({ grupo: grupoAtivo, sub: categoria }, ''); } catch (e) {}
    renderizarNavegacao();
    renderizarProdutos();
}

function voltarInicio() {
    limparBusca();
    if (grupoAtivo) {
        try { history.pushState({ grupo: null, sub: null }, ''); } catch (e) {}
    }
    grupoAtivo = null;
    subAtiva = null;
    renderizarNavegacao();
    renderizarProdutos();
    irParaTopo();
    return false; // usado pelo link da logo (nao recarrega a pagina)
}

function filtrarProdutos() {
    termoBusca = document.getElementById('search-input').value.trim();
    renderizarProdutos();
}

// Chips fixos no topo (so dentro de uma categoria): categorias principais + subcategorias
function renderizarNavegacao() {
    const nav = document.getElementById('nav-categorias');
    const conteudo = document.getElementById('loja-conteudo');
    document.body.classList.toggle('vista-categoria', !!grupoAtivo);

    if (!grupoAtivo) {
        nav.innerHTML = '';
        nav.hidden = true;
    } else {
        let html = '<div class="chips-row"><button type="button" class="cat-btn" onclick="voltarInicio()">&larr; In&iacute;cio</button>';
        html += gruposVisiveis().map(g =>
            `<button type="button" class="cat-btn${g.id === grupoAtivo ? ' active' : ''}" onclick="selecionarCategoria('${g.id}')">${g.emoji} ${g.nome}</button>`
        ).join('');
        html += '</div>';

        const grupo = GRUPOS.find(g => g.id === grupoAtivo);
        const subs = grupo ? grupo.categorias.filter(c => produtosDaCategoria(c).length > 0) : [];
        if (subs.length > 1) {
            html += `<div class="chips-row"><button type="button" class="sub-btn${subAtiva ? '' : ' active'}" onclick="selecionarSub(null)">Todos</button>`;
            html += subs.map(c =>
                `<button type="button" class="sub-btn${subAtiva === c ? ' active' : ''}" onclick="selecionarSub('${c}')">${TITULOS_SECAO[c] || c}</button>`
            ).join('');
            html += '</div>';
        }

        nav.innerHTML = html;
        nav.hidden = false;
        const ativo = nav.querySelector('.cat-btn.active');
        if (ativo && ativo.scrollIntoView) ativo.scrollIntoView({ block: 'nearest', inline: 'center' });
    }

    // pequena animacao ao trocar de tela
    conteudo.classList.remove('entrando');
    void conteudo.offsetWidth;
    conteudo.classList.add('entrando');
}

// ===================================================
// RENDERIZAÇÃO DOS PRODUTOS
// ===================================================
function htmlBotaoProduto(produto) {
    const quantidade = carrinho.filter(item => item.id === produto.id).reduce((soma, item) => soma + item.qtd, 0);
    if (produto.precoPendente) return '<button type="button" class="add-btn" disabled>Em breve</button>';
    if (produto.sabores) {
        return `<button class="add-btn" onclick="abrirSeletorSabor(${produto.id})">+ Escolher sabor${quantidade > 0 ? ' (' + quantidade + ')' : ''}</button>`;
    }
    if (quantidade === 0) {
        return `<button class="add-btn" onclick="adicionarAoCarrinho(${produto.id})">+ Adicionar</button>`;
    }
    return `<div class="qty-control">
                <button class="qty-btn" onclick="alterarQuantidade(${produto.id}, -1)" aria-label="Diminuir">-</button>
                <span class="qty-number">${quantidade}</span>
                <button class="qty-btn" onclick="alterarQuantidade(${produto.id}, 1)" aria-label="Aumentar">+</button>
            </div>`;
}

function htmlCard(produto) {
    const semFoto = !produto.imagem || produto.imagem === 'logo.jpg';
    // Mostra o volume so quando o nome ainda nao traz essa informacao (ex.: "Long Neck")
    const mostraVolume = produto.volume && !normalizar(produto.nome).includes(normalizar(produto.volume));
    return `
        <article class="product-card">
            <div class="product-image-container${semFoto ? ' no-photo' : ''}">
                <img src="${produto.imagem || 'logo.jpg'}" alt="${produto.nome}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='logo.jpg';this.parentNode.classList.add('no-photo')">
                ${(CONFIG.mostrarEtiquetaVolume && produto.volume) ? `<span class="product-volume-tag">${produto.volume}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <span class="product-volume">${mostraVolume ? produto.volume : ''}</span>
                <span class="product-price${produto.precoPendente ? ' pendente' : ''}">${produto.precoPendente ? 'Pre&ccedil;o em breve' : formatarPreco(produto.preco)}</span>
                <div class="product-actions">${htmlBotaoProduto(produto)}</div>
            </div>
        </article>`;
}

function htmlGrade(lista) {
    return `<div class="products-grid">${lista.map(htmlCard).join('')}</div>`;
}

function htmlTopoSecao(titulo, contagem) {
    return `<div class="secao-topo"><h2 class="secao-titulo">${titulo}</h2>${contagem ? `<span class="secao-contagem">${contagem}</span>` : ''}</div>`;
}

function textoContagem(n) {
    return `${n} ${n === 1 ? 'produto' : 'produtos'}`;
}

function htmlVazio(titulo, texto) {
    return `<div class="loja-vazio"><strong>${titulo}</strong>${texto}</div>`;
}

// Pagina inicial: categorias, destaques e ofertas
function htmlInicio() {
    const tiles = gruposVisiveis().map(g => {
        const vazio = produtosDoGrupo(g).length === 0;
        const foto = g.imagem ? `<img src="${g.imagem}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : '';
        return `
            <button type="button" class="cat-tile" onclick="selecionarCategoria('${g.id}')">
                ${vazio ? '<span class="cat-tile-soon">Em breve</span>' : ''}
                <span class="cat-tile-media"><span class="cat-tile-emoji" aria-hidden="true">${g.emoji}</span>${foto}</span>
                <span class="cat-tile-name">${g.nome}</span>
            </button>`;
    }).join('');

    let html = `<section class="loja-secao">${htmlTopoSecao('Categorias')}<div class="cat-grid">${tiles}</div></section>`;

    // Sem dados de vendas: os destaques sao os produtos escolhidos em CONFIG.destaques
    const destaques = (CONFIG.destaques || []).map(id => PRODUTOS.find(p => p.id === id)).filter(p => p && liberadoParaVenda(p));
    if (destaques.length > 0) {
        html += `<section class="loja-secao">${htmlTopoSecao('Destaques')}${htmlGrade(destaques)}</section>`;
    }

    // Ofertas: aparece so quando existem combos cadastrados
    const ofertas = produtosDaCategoria('combos');
    if (ofertas.length > 0) {
        html += `<section class="loja-secao">${htmlTopoSecao('Ofertas e combos')}${htmlGrade(ofertas)}</section>`;
    }
    return html;
}

// Dentro de uma categoria principal (com as subcategorias originais como secoes)
function htmlCategoria() {
    const grupo = GRUPOS.find(g => g.id === grupoAtivo);
    if (!grupo) return htmlInicio();

    const categorias = grupo.categorias.filter(c => (!subAtiva || c === subAtiva) && produtosDaCategoria(c).length > 0);
    const total = categorias.reduce((soma, c) => soma + produtosDaCategoria(c).length, 0);
    let html = `<section class="loja-secao" style="margin-top:20px">${htmlTopoSecao(`${grupo.emoji} ${grupo.nome}`, total ? textoContagem(total) : '')}`;

    if (total === 0) {
        html += htmlVazio(`${grupo.nome} em breve!`, 'Estamos preparando ofertas especiais pra voc&ecirc;.');
    } else {
        const comTitulos = !!grupo.titulosSempre || categorias.length > 1;
        html += '<div class="products-grid">';
        categorias.forEach(c => {
            if (comTitulos) html += `<h3 class="section-title">${TITULOS_SECAO[c] || c}</h3>`;
            html += produtosDaCategoria(c).map(htmlCard).join('');
        });
        html += '</div>';
    }
    return html + '</section>';
}

// Resultado da pesquisa: procura em TODAS as categorias
function htmlBusca() {
    const termo = normalizar(termoBusca);
    const filtrados = PRODUTOS.filter(produto => liberadoParaVenda(produto) &&
        normalizar(`${produto.nome} ${produto.descricao || ''} ${(produto.sabores || []).join(' ')}`).includes(termo));

    const topo = htmlTopoSecao(`Resultados para &ldquo;${escaparHtml(termoBusca)}&rdquo;`, textoContagem(filtrados.length));
    if (filtrados.length === 0) {
        return `<section class="loja-secao" style="margin-top:20px">${topo}${htmlVazio('Nenhuma bebida encontrada.', 'Tente pesquisar por outro nome.')}</section>`;
    }
    return `<section class="loja-secao" style="margin-top:20px">${topo}${htmlGrade(filtrados)}</section>`;
}

function renderizarProdutos() {
    const nav = document.getElementById('nav-categorias');
    if (nav) nav.hidden = !grupoAtivo || !!termoBusca;

    const container = document.getElementById('loja-conteudo');
    if (termoBusca) {
        container.innerHTML = htmlBusca();
    } else if (grupoAtivo) {
        container.innerHTML = htmlCategoria();
    } else {
        container.innerHTML = htmlInicio();
    }
}

// ===================================================
// GERENCIAMENTO DO CARRINHO
// ===================================================
function adicionarAoCarrinho(idProduto, sabor) {
    const produto = PRODUTOS.find(p => p.id === idProduto);
    if (!produto || !liberadoParaVenda(produto) || produto.precoPendente) return;

    // Produto com sabores: abre a escolha de sabor antes de adicionar
    if (produto.sabores && !sabor) {
        abrirSeletorSabor(idProduto);
        return;
    }

    const itemExistente = carrinho.find(item => item.id === idProduto && (item.sabor || '') === (sabor || ''));
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        const novo = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            volume: produto.volume,
            qtd: 1
        };
        if (sabor) novo.sabor = sabor;
        carrinho.push(novo);
    }

    salvarEAtualizar();
}

function alterarQuantidade(idProduto, variacao) {
    const index = carrinho.findIndex(item => item.id === idProduto && !item.sabor);
    alterarQuantidadeIndice(index, variacao);
}

// Altera a quantidade de uma linha do carrinho (cada sabor e uma linha separada)
function alterarQuantidadeIndice(index, variacao) {
    if (index < 0 || index >= carrinho.length) return;

    carrinho[index].qtd += variacao;

    if (carrinho[index].qtd <= 0) {
        carrinho.splice(index, 1);
    }

    salvarEAtualizar();
    renderizarSeletorSabor(); // se a escolha de sabor estiver aberta, atualiza as quantidades
}

// ===================================================
// ESCOLHA DE SABOR (produtos que tem a lista "sabores")
// ===================================================
let produtoSaborAberto = null;

function abrirSeletorSabor(idProduto) {
    const produto = PRODUTOS.find(p => p.id === idProduto);
    if (!produto || !produto.sabores || !liberadoParaVenda(produto)) return;
    produtoSaborAberto = idProduto;

    let overlay = document.getElementById('sabor-modal');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sabor-modal';
        overlay.className = 'sabor-overlay';
        overlay.addEventListener('click', event => {
            if (event.target === overlay) fecharSeletorSabor();
        });
        document.body.appendChild(overlay);
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderizarSeletorSabor();
}

function fecharSeletorSabor() {
    produtoSaborAberto = null;
    const overlay = document.getElementById('sabor-modal');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function renderizarSeletorSabor() {
    if (produtoSaborAberto === null) return;
    const overlay = document.getElementById('sabor-modal');
    const produto = PRODUTOS.find(p => p.id === produtoSaborAberto);
    if (!overlay || !produto) return;

    const linhas = produto.sabores.map((sabor, i) => {
        const item = carrinho.find(it => it.id === produto.id && it.sabor === sabor);
        const qtd = item ? item.qtd : 0;
        const controle = qtd === 0
            ? `<button class="add-btn" onclick="alterarSabor(${i}, 1)">+ Adicionar</button>`
            : `<div class="qty-control">
                   <button class="qty-btn" onclick="alterarSabor(${i}, -1)">-</button>
                   <span class="qty-number">${qtd}</span>
                   <button class="qty-btn" onclick="alterarSabor(${i}, 1)">+</button>
               </div>`;
        return `<div class="sabor-linha"><span class="sabor-nome">${sabor}</span>${controle}</div>`;
    }).join('');

    const total = carrinho.filter(it => it.id === produto.id).reduce((soma, it) => soma + it.qtd, 0);
    const textoPronto = total > 0 ? `Pronto (${total} ${total === 1 ? 'item' : 'itens'})` : 'Fechar';

    overlay.innerHTML = `
        <div class="sabor-sheet" role="dialog" aria-modal="true" aria-label="Escolha o sabor">
            <div class="sabor-topo">
                <div>
                    <h3 class="sabor-titulo">${produto.nome}</h3>
                    <p class="sabor-sub">Escolha o sabor &middot; R$ ${produto.preco.toFixed(2).replace('.', ',')} cada</p>
                </div>
                <button class="close-btn" onclick="fecharSeletorSabor()" aria-label="Fechar">&times;</button>
            </div>
            <div class="sabor-lista">${linhas}</div>
            <button class="sabor-pronto" onclick="fecharSeletorSabor()">${textoPronto}</button>
        </div>
    `;
}

function alterarSabor(indiceSabor, variacao) {
    const produto = PRODUTOS.find(p => p.id === produtoSaborAberto);
    if (!produto) return;
    const sabor = produto.sabores[indiceSabor];

    if (variacao > 0) {
        adicionarAoCarrinho(produto.id, sabor);
        renderizarSeletorSabor();
    } else {
        const index = carrinho.findIndex(it => it.id === produto.id && it.sabor === sabor);
        alterarQuantidadeIndice(index, variacao);
    }
}

function salvarEAtualizar() {
    localStorage.setItem('adega_carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoVisual();
    renderizarProdutos();
}

function tipoEntregaAtual() {
    const marcado = document.querySelector('input[name="tipoEntrega"]:checked');
    return marcado ? marcado.value : 'Entrega em Domicílio';
}

function calcularTotais() {
    let subtotal = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        subtotal += item.preco * item.qtd;
        totalItens += item.qtd;
    });

    // A taxa só é cobrada na entrega em domicílio (retirada no local é grátis)
    const taxa = tipoEntregaAtual() === 'Entrega em Domicílio' ? (CONFIG.taxaEntregaFixa || 0) : 0;
    const total = subtotal + taxa;

    return { subtotal, taxa, total, totalItens };
}

function atualizarCarrinhoVisual() {
    const { subtotal, taxa, total, totalItens } = calcularTotais();

    // Contadores
    const contador = document.getElementById('cart-counter');
    contador.innerText = totalItens;
    contador.classList.toggle('vazio', totalItens === 0);

    // Barra mobile
    const mobileBar = document.getElementById('mobile-cart-bar');
    if (totalItens > 0) {
        mobileBar.style.display = 'flex';
        document.getElementById('mobile-cart-count').innerText = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
        document.getElementById('mobile-cart-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    } else {
        mobileBar.style.display = 'none';
    }

    // Gaveta do Carrinho
    const container = document.getElementById('cart-items-container');
    const formSection = document.getElementById('checkout-form-section');
    const btnFinalizar = document.getElementById('btn-finalizar');

    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <p style="font-size: 2.2rem; margin-bottom: 8px;">🛒</p>
                <p style="font-weight: 600; color: #ffffff;">Seu carrinho está vazio</p>
                <p style="font-size: 0.85rem; margin-top: 4px; color: var(--text-secondary);">Adicione energéticos, cervejas e bebidas para pedir!</p>
            </div>
        `;
        formSection.style.display = 'none';
        btnFinalizar.disabled = true;
    } else {
        formSection.style.display = 'block';
        btnFinalizar.disabled = false;

        let html = '';
        carrinho.forEach((item, idx) => {
            const itemTotal = item.preco * item.qtd;
            html += `
                <div class="cart-item">
                    <div style="flex: 1; padding-right: 8px;">
                        <div class="cart-item-name">${item.nome}${item.sabor ? ' - ' + item.sabor : ''}</div>
                        <div class="cart-item-sub">R$ ${item.preco.toFixed(2).replace('.', ',')} un. (${item.volume})</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="alterarQuantidadeIndice(${idx}, -1)">-</button>
                            <span class="qty-number">${item.qtd}</span>
                            <button class="qty-btn" onclick="alterarQuantidadeIndice(${idx}, 1)">+</button>
                        </div>
                        <span class="cart-item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // Totais no rodapé do drawer
    document.getElementById('resumo-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('resumo-taxa').innerText = taxa > 0 ? `R$ ${taxa.toFixed(2).replace('.', ',')}` : 'Grátis';
    document.getElementById('resumo-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ===================================================
// CONTROLES DE INTERFACE DO CHECKOUT
// ===================================================
function abrirCarrinho() {
    document.getElementById('cart-modal').classList.add('open');
    document.body.style.overflow = 'hidden'; // Impede rolar a página por trás
}

function fecharCarrinho() {
    document.getElementById('cart-modal').classList.remove('open');
    document.body.style.overflow = 'auto';
}

function fecharCarrinhoSeClicarFora(event) {
    if (event.target.id === 'cart-modal') {
        fecharCarrinho();
    }
}

function toggleTipoEntrega() {
    const tipo = tipoEntregaAtual();
    const enderecoCampos = document.getElementById('endereco-campos');
    if (tipo === 'Retirada no Local') {
        enderecoCampos.style.display = 'none';
    } else {
        enderecoCampos.style.display = 'block';
    }
    // Recalcula os totais (taxa só na entrega)
    atualizarCarrinhoVisual();
}

function toggleTroco() {
    const forma = document.getElementById('forma-pagamento').value;
    const trocoContainer = document.getElementById('troco-container');
    if (forma === 'Dinheiro') {
        trocoContainer.style.display = 'block';
    } else {
        trocoContainer.style.display = 'none';
    }
}

// ===================================================
// ENVIAR PEDIDO DIRETAMENTE PARA O WHATSAPP
// ===================================================
function enviarPedidoWhatsApp() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione algum produto antes de finalizar.');
        return;
    }

    const nome = document.getElementById('cliente-nome').value.trim();
    if (!nome) {
        alert('Por favor, informe seu nome.');
        document.getElementById('cliente-nome').focus();
        return;
    }

    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked').value;
    let rua = '';
    let numero = '';
    let bairro = '';
    let complemento = '';

    if (tipoEntrega === 'Entrega em Domicílio') {
        rua = document.getElementById('cliente-rua').value.trim();
        numero = document.getElementById('cliente-numero').value.trim();
        bairro = document.getElementById('cliente-bairro').value.trim();
        complemento = document.getElementById('cliente-complemento').value.trim();

        if (!rua) {
            alert('Por favor, informe a Rua/Avenida para entrega.');
            document.getElementById('cliente-rua').focus();
            return;
        }
        if (!numero) {
            alert('Por favor, informe o Número da residência.');
            document.getElementById('cliente-numero').focus();
            return;
        }
        if (!bairro) {
            alert('Por favor, informe o Bairro.');
            document.getElementById('cliente-bairro').focus();
            return;
        }
    }

    const telefone = document.getElementById('cliente-telefone').value.trim();
    const formaPagamento = document.getElementById('forma-pagamento').value;
    const troco = document.getElementById('troco-para').value.trim();
    const obs = document.getElementById('cliente-obs').value.trim();

    // Guarda nome, telefone e endereço neste aparelho para o próximo pedido
    salvarDadosCliente(tipoEntrega === 'Entrega em Domicílio');

    const { subtotal, taxa, total } = calcularTotais();

    // FORMATAR MENSAGEM DO WHATSAPP
    let mensagem = `*NOVO PEDIDO - ${nomeLojaAtual.toUpperCase()}*\n`;
    mensagem += `─────────────────────────\n`;
    mensagem += `*CLIENTE:* ${nome}\n`;
    if (telefone) mensagem += `*TELEFONE:* ${telefone}\n`;
    mensagem += `*TIPO:* ${tipoEntrega}\n`;

    if (tipoEntrega === 'Entrega em Domicílio') {
        mensagem += `*ENDEREÇO DE ENTREGA:*\n`;
        mensagem += `📍 ${rua}, Nº ${numero}\n`;
        mensagem += `📍 Bairro: ${bairro}\n`;
        if (complemento) mensagem += `📍 Ref/Comp: ${complemento}\n`;
    }

    mensagem += `─────────────────────────\n`;
    mensagem += `*ITENS DO PEDIDO:*\n`;

    carrinho.forEach(item => {
        const itemTotal = (item.preco * item.qtd).toFixed(2).replace('.', ',');
        mensagem += `▪️ ${item.qtd}x ${item.nome}${item.sabor ? ' - ' + item.sabor : ''} (${item.volume}) - R$ ${itemTotal}\n`;
    });

    mensagem += `─────────────────────────\n`;
    mensagem += `*SUBTOTAL:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (taxa > 0) mensagem += `*TAXA DE ENTREGA:* R$ ${taxa.toFixed(2).replace('.', ',')}\n`;
    mensagem += `*TOTAL DO PEDIDO:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    mensagem += `*PAGAMENTO:* ${formaPagamento}\n`;

    if (formaPagamento === 'Dinheiro' && troco) {
        mensagem += `*TROCO:* ${troco}\n`;
    }

    if (obs) {
        mensagem += `*OBSERVAÇÃO:* ${obs}\n`;
    }

    mensagem += `─────────────────────────\n`;
    mensagem += `_Pedido feito pelo site ${nomeLojaAtual}._`;

    // Codifica a mensagem para a URL
    const mensagemEncoded = encodeURIComponent(mensagem);

    // Formata o número de WhatsApp da loja (somente dígitos)
    const numeroZapLimpo = whatsappNumero.replace(/\D/g, '');

    const urlZap = `https://api.whatsapp.com/send?phone=${numeroZapLimpo}&text=${mensagemEncoded}`;

    // Abre o WhatsApp
    window.open(urlZap, '_blank');
}

// ===== INSTALAR O APP (botao "Instalar") =====
(function () {
    var banner = document.getElementById('install-banner');
    var btnInstalar = document.getElementById('install-btn');
    var btnFechar = document.getElementById('install-close');
    if (!banner || !btnInstalar || !btnFechar) { return; }
    var eventoInstalar = null;
    var CHAVE = 'devides_instalar_fechado';

    function jaInstalado() {
        return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    }
    function fechadoAntes() {
        try { return localStorage.getItem(CHAVE) === '1'; } catch (e) { return false; }
    }
    function mostrar() {
        if (jaInstalado() || fechadoAntes()) { return; }
        banner.hidden = false;
    }

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        eventoInstalar = e;
        mostrar();
    });
    window.addEventListener('appinstalled', function () {
        banner.hidden = true;
        eventoInstalar = null;
    });

    // iPhone/iPad (Safari) nao tem botao automatico: mostra o aviso com o passo a passo
    var ehIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (ehIOS) { mostrar(); }

    btnInstalar.addEventListener('click', function () {
        if (eventoInstalar) {
            eventoInstalar.prompt();
            eventoInstalar.userChoice.then(function () {
                eventoInstalar = null;
                banner.hidden = true;
            });
        } else if (ehIOS) {
            alert('Para instalar: toque no bot\u00e3o Compartilhar (quadrado com seta) e depois em "Adicionar \u00e0 Tela de In\u00edcio".');
        }
    });
    btnFechar.addEventListener('click', function () {
        banner.hidden = true;
        try { localStorage.setItem(CHAVE, '1'); } catch (e) {}
    });
})();