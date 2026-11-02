// ===================================================
// ESTADO DA APLICAÇÃO
// ===================================================
let carrinho = JSON.parse(localStorage.getItem('adega_carrinho')) || [];
carrinho = carrinho.filter(item => PRODUTOS.some(p => p.id === item.id)); // ignora itens de produtos que nao existem mais
let categoriaAtiva = 'cervejas'; // aba inicial; ao carregar vira a 1a aba visivel
let termoBusca = '';

// Número e nome da loja vêm sempre do products.js
const whatsappNumero = CONFIG.whatsapp;
const nomeLojaAtual = CONFIG.nomeLoja;

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

    aplicarRestricaoIdade();
    irParaPrimeiraAba();
    carregarDadosCliente();
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

    aplicarRestricaoIdade();
    irParaPrimeiraAba();
    renderizarProdutos();
    atualizarCarrinhoVisual();
}

// Seleciona a primeira aba visivel (para menores de 18 pula as abas alcoolicas)
function irParaPrimeiraAba() {
    const primeira = Array.from(document.querySelectorAll('.cat-btn')).find(btn => btn.style.display !== 'none');
    if (!primeira) return;
    categoriaAtiva = primeira.dataset.categoria || 'todas';
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    primeira.classList.add('active');
}

function aplicarRestricaoIdade() {
    const restrito = respostaIdade !== 'maior';

    // Esconde os botões das categorias alcoólicas
    document.querySelectorAll('.cat-btn[data-categoria]').forEach(btn => {
        const alcoolica = CATEGORIAS_ALCOOLICAS.includes(btn.dataset.categoria);
        const semProdutos = !PRODUTOS.some(p => p.categoria === btn.dataset.categoria);
        btn.style.display = ((restrito && alcoolica) || semProdutos) ? 'none' : '';
    });

    // Se estava numa aba bloqueada (alcoolica), vai para a primeira aba liberada
    if (restrito && CATEGORIAS_ALCOOLICAS.includes(categoriaAtiva)) {
        irParaPrimeiraAba();
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
            ? '🔍 Buscar bebida... (Baly 2L, Coca-Cola, Gelo...)'
            : '🔍 Buscar bebida... (Baly 2L, Skol latão, Gin de 10, Gelo...)';
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
// RENDERIZAÇÃO DOS PRODUTOS
// ===================================================
function renderizarProdutos() {
    const container = document.getElementById('produtos-container');
    container.innerHTML = '';

    const filtrados = PRODUTOS.filter(produto => {
        if (!liberadoParaVenda(produto)) return false;
        // Pesquisando: procura em TODAS as abas. Sem pesquisa: so a aba escolhida.
        const bateCategoria = true; // cardapio em uma pagina so: todas as secoes aparecem, cada uma com seu titulo
        const bateBusca = produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                          produto.descricao.toLowerCase().includes(termoBusca.toLowerCase());
        return bateCategoria && bateBusca;
    });

    if (filtrados.length === 0 && termoBusca === '' && false) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6b7280;">
                <p style="font-size: 1.1rem; font-weight: 500;">Combos em breve!</p>
                <p style="font-size: 0.9rem; margin-top: 6px;">Estamos preparando ofertas especiais pra voc&ecirc;.</p>
            </div>
        `;
        return;
    }

    if (filtrados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6b7280;">
                <p style="font-size: 1.1rem; font-weight: 500;">Nenhuma bebida encontrada.</p>
                <p style="font-size: 0.9rem; margin-top: 6px;">Tente pesquisar por outro nome ou mudar a categoria.</p>
            </div>
        `;
        return;
    }

    // Ordena pelas secoes na mesma ordem dos botoes das abas
    const ordemAbas = Array.from(document.querySelectorAll('.cat-btn[data-categoria]')).map(b => b.dataset.categoria);
    const posAba = c => (ordemAbas.indexOf(c) === -1 ? 99 : ordemAbas.indexOf(c));
    filtrados.sort((x, y) => posAba(x.categoria) - posAba(y.categoria));

    const TITULOS_SECAO = {
        cervejas: 'Cervejas',
        energeticos: 'Energ&eacute;ticos',
        combos: 'Combos',
        destilados: 'Gin &amp; Destilados',
        refrigerantes: 'Refrigerantes',
        gelo: 'Gelo &amp; Cop&atilde;o'
    };
    let ultimaCategoria = null;

    filtrados.forEach(produto => {
        if (produto.categoria !== ultimaCategoria) {
            ultimaCategoria = produto.categoria;
            const titulo = document.createElement('h2');
            titulo.className = 'section-title';
            titulo.id = 'secao-' + produto.categoria;
            titulo.innerHTML = TITULOS_SECAO[produto.categoria] || produto.categoria;
            container.appendChild(titulo);
        }

        const itemNoCarrinho = carrinho.find(item => item.id === produto.id);
        const quantidade = itemNoCarrinho ? itemNoCarrinho.qtd : 0;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&auto=format&fit=crop&q=60'">
                <span class="product-volume-tag">${produto.volume}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${produto.nome}</h3>
                <p class="product-desc">${produto.descricao}</p>
                
                <div class="product-footer">
                    <span class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    
                    <div id="btn-container-${produto.id}">
                        ${quantidade === 0 ? `
                            <button class="add-btn" onclick="adicionarAoCarrinho(${produto.id})">
                                + Adicionar
                            </button>
                        ` : `
                            <div class="qty-control">
                                <button class="qty-btn" onclick="alterarQuantidade(${produto.id}, -1)">-</button>
                                <span class="qty-number">${quantidade}</span>
                                <button class="qty-btn" onclick="alterarQuantidade(${produto.id}, 1)">+</button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===================================================
// FILTROS E BUSCA
// ===================================================
function selecionarCategoria(categoria, btnElement) {
    categoriaAtiva = categoria;
    
    // Atualiza classes ativas nos botões
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    }

    // Cardapio em uma pagina so: a aba leva ate a secao
    const alvo = document.getElementById('secao-' + categoria);
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filtrarProdutos() {
    termoBusca = document.getElementById('search-input').value.trim();
    renderizarProdutos();
}

// ===================================================
// GERENCIAMENTO DO CARRINHO
// ===================================================
function adicionarAoCarrinho(idProduto) {
    const produto = PRODUTOS.find(p => p.id === idProduto);
    if (!produto || !liberadoParaVenda(produto)) return;

    const itemExistente = carrinho.find(item => item.id === idProduto);
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            volume: produto.volume,
            qtd: 1
        });
    }

    salvarEAtualizar();
}

function alterarQuantidade(idProduto, variacao) {
    const index = carrinho.findIndex(item => item.id === idProduto);
    if (index === -1) return;

    carrinho[index].qtd += variacao;

    if (carrinho[index].qtd <= 0) {
        carrinho.splice(index, 1);
    }

    salvarEAtualizar();
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
    document.getElementById('cart-counter').innerText = totalItens;

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
        carrinho.forEach(item => {
            const itemTotal = item.preco * item.qtd;
            html += `
                <div class="cart-item">
                    <div style="flex: 1; padding-right: 8px;">
                        <div class="cart-item-name">${item.nome}</div>
                        <div class="cart-item-sub">R$ ${item.preco.toFixed(2).replace('.', ',')} un. (${item.volume})</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                            <span class="qty-number">${item.qtd}</span>
                            <button class="qty-btn" onclick="alterarQuantidade(${item.id}, 1)">+</button>
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
        mensagem += `▪️ ${item.qtd}x ${item.nome} (${item.volume}) - R$ ${itemTotal}\n`;
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

