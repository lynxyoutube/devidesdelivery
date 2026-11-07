
// CONFIGURAÇÃO DA SUA LOJA
const CONFIG = {
    nomeLoja: "Devides Delivery",
    slogan: "Pediu, chegou, gelou!",
    // WhatsApp da loja: 55 + DDD + número (+55 18 99604-9894)
    whatsapp: "5518996049894",
    taxaEntregaFixa: 2.00, // Taxa fixa de entrega (não é cobrada na retirada no local)
    // Etiqueta verde pequena em cima da foto (mostra o campo volume do produto). true = mostrar
    mostrarEtiquetaVolume: false,
    // Categorias com bebida alcoólica: ficam bloqueadas para quem disser que é menor de 18 anos
    categoriasAlcoolicas: ["cervejas", "garrafinhas", "longneck", "drinks", "combos", "destilados"],
    // Categorias principais da vitrine (as 6 que aparecem na pagina inicial).
    // "categorias" = categorias originais dos produtos que ficam dentro dela (os produtos NAO mudam de categoria).
    // "imagem" = foto da categoria (opcional). Sem foto, aparece o emoji. Ex.: imagem: "imagens/categorias/gelo.jpg"
    grupos: [
        { id: "cervejas",    nome: "Cervejas",   emoji: "\uD83C\uDF7A", categorias: ["garrafinhas", "cervejas", "longneck"], imagem: "imagens/categorias/cervejas.jpg" },
        { id: "destilados",  nome: "Destilados", emoji: "\uD83E\uDD43", categorias: ["destilados", "drinks"], imagem: "imagens/categorias/destilados.jpg" },
        { id: "energeticos", nome: "Energ\u00e9ticos", emoji: "\u26A1", categorias: ["baly", "monster", "redbull"], titulosSempre: true, imagem: "imagens/categorias/energeticos.jpg" },
        { id: "semalcool",   nome: "Sem \u00e1lcool", emoji: "\uD83E\uDD64", categorias: ["latas", "garrafas"], titulosSempre: true, imagem: "imagens/categorias/semalcool.jpg" },
        { id: "gelo",        nome: "Gelo",       emoji: "\uD83E\uDDCA", categorias: ["gelo"], imagem: "imagens/categorias/gelo.jpg" },
        { id: "combos",      nome: "Combos",     emoji: "\uD83C\uDF81", categorias: ["combos"], mostrarVazio: false }
    ],
    // Produtos em destaque na pagina inicial (ids do catalogo abaixo). Troque os numeros para mudar os destaques.
    destaques: [29, 14, 24, 37, 30, 19],
    mensagemAviso: "Pediu, chegou, gelou! • Distribuidora de Bebidas • Delivery e Retirada"
};

// CATÁLOGO DE BEBIDAS
// Você pode alterar os preços, nomes e adicionar quantos produtos quiser aqui!
// As fotos abaixo são apenas de demonstração (Unsplash). Troque pelas fotos reais dos seus produtos
// colocando o arquivo na pasta do site e usando o nome dele, ex: imagem: "baly-tradicional.jpg"
const PRODUTOS = [
    // --- COMBOS (aba "Combos"; some enquanto nao tiver nenhum combo) ---
    // Para adicionar um combo, copie o modelo abaixo, tire as barras // do inicio e preencha:
    // { id: 200, nome: "Combo Exemplo", categoria: "combos", preco: 0.00, volume: "Combo", descricao: "O que vem no combo.", imagem: "logo.jpg" },
    // Produto sem foto: use imagem: "logo.jpg" (aparece a logo da loja).

    // --- CERVEJAS LATA (aba "Cervejas Lata") ---
    { id: 10, nome: "Conti Lata", categoria: "cervejas", preco: 3.25, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/conti-lata.jpg" },
    { id: 11, nome: "Conti Lat\u00e3o", categoria: "cervejas", preco: 4.25, volume: "473ml", descricao: "Cerveja gelada.", imagem: "imagens/conti-latao.jpg" },
    { id: 12, nome: "Moinho Real Lata", categoria: "cervejas", preco: 4.00, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/moinho-real-lata.jpg" },
    { id: 13, nome: "Moinho Real Ultra", categoria: "cervejas", preco: 5.00, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/moinho-real-ultra.jpg" },
    { id: 14, nome: "Skol Lata", categoria: "cervejas", preco: 3.70, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/skol-lata.jpg" },
    { id: 15, nome: "Brahma Lata", categoria: "cervejas", preco: 3.99, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/brahma-lata.jpg" },
    { id: 16, nome: "Antarctica Lata", categoria: "cervejas", preco: 3.99, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/antarctica-lata.jpg" },
    { id: 17, nome: "Amstel Lata", categoria: "cervejas", preco: 3.99, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/amstel-lata.jpg" },
    { id: 18, nome: "Imp\u00e9rio Lata", categoria: "cervejas", preco: 3.89, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/imperio-lata.jpg" },
    { id: 19, nome: "Heineken Lata", categoria: "cervejas", preco: 6.00, volume: "350ml", descricao: "Cerveja gelada.", imagem: "imagens/heineken-lata.jpg" },

    // --- GARRAFINHAS / ROMARINHO 300ml (aba "Garrafinhas") ---
    { id: 9, nome: "Conti Romarinho", categoria: "garrafinhas", preco: 2.99, volume: "300ml", descricao: "Cerveja gelada.", imagem: "imagens/conti-romarinho.jpg" },
    { id: 20, nome: "Brahma Romarinho", categoria: "garrafinhas", preco: 2.99, volume: "300ml", descricao: "Cerveja gelada.", imagem: "imagens/brahma-romarinho.jpg" },
    { id: 21, nome: "Skol Romarinho", categoria: "garrafinhas", preco: 2.99, volume: "300ml", descricao: "Cerveja gelada.", imagem: "imagens/skol-romarinho.jpg" },
    { id: 22, nome: "Antarctica Romarinho", categoria: "garrafinhas", preco: 2.99, volume: "300ml", descricao: "Cerveja gelada.", imagem: "imagens/antarctica-romarinho.jpg" },
    { id: 23, nome: "Original Garrafinha", categoria: "garrafinhas", preco: 3.79, volume: "300ml", descricao: "Cerveja gelada.", imagem: "imagens/original-garrafinha.jpg" },

    // --- LONG NECK ---
    { id: 24, nome: "Heineken", categoria: "longneck", preco: 7.00, volume: "Long Neck · 300ml", descricao: "Long neck gelada.", imagem: "imagens/heineken-longneck.jpg" },
    { id: 25, nome: "Heineken Zero", categoria: "longneck", preco: 7.50, volume: "Long Neck · 300ml", descricao: "Long neck gelada.", imagem: "imagens/heineken-zero-longneck.jpg" },
    { id: 26, nome: "Amstel Ultra", categoria: "longneck", preco: 7.50, volume: "Long Neck · 275ml", descricao: "Long neck gelada.", imagem: "imagens/amstel-ultra-longneck.jpg" },
    { id: 27, nome: "Spaten", categoria: "longneck", preco: 7.79, volume: "Long Neck · 330ml", descricao: "Long neck gelada.", imagem: "imagens/spaten-longneck.jpg" },
    { id: 28, nome: "Moinho Real", categoria: "longneck", preco: 3.50, volume: "Long Neck · 330ml", descricao: "Long neck gelada.", imagem: "imagens/moinho-real-longneck.jpg" },
    { id: 86, nome: "Império Ultra", categoria: "longneck", preco: 7.00, volume: "Long Neck · 275ml", descricao: "Long neck gelada.", imagem: "logo.jpg" },
    { id: 94, nome: "Michelob", categoria: "longneck", preco: 7.00, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },

    // --- ENERGETICOS (aba "Energeticos": cada marca vira uma secao com titulo verde) ---
    // Marcas: categoria "baly", "monster" ou "redbull". A ordem das secoes e a de CONFIG.grupos (Baly, Monster, Red Bull).
    // Para adicionar mais: copie uma linha de Monster ou Red Bull, mude o id (proximo numero livre) e preencha nome, preco e foto.
    { id: 6, nome: "Baly Melancia", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml melancia gelada.", imagem: "imagens/baly-melancia-lata-2.jpg" },
    { id: 8, nome: "Baly Ma\u00e7\u00e3 Verde", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml ma\u00e7\u00e3 verde gelada.", imagem: "imagens/baly-maca-verde-lata-2.jpg" },
    { id: 29, nome: "Baly Tradicional", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/baly-tradicional-lata-3.jpg" },
    { id: 30, nome: "Baly Morango e P\u00eassego", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/baly-morango-pessego-lata-2.jpg" },
    { id: 31, nome: "Baly Coco e A\u00e7a\u00ed", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/baly-coco-acai-lata-2.jpg" },
    { id: 32, nome: "Baly Frutas Tropicais", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/baly-frutas-tropicais-lata-2.jpg" },
    { id: 33, nome: "Baly Tradicional Sem A\u00e7\u00facar", categoria: "baly", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/baly-tradicional-sem-acucar-lata-2.jpg" },
    { id: 34, nome: "Baly Melancia", categoria: "baly", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "imagens/baly-melancia-2l-2.jpg" },
    { id: 35, nome: "Baly Ma\u00e7\u00e3 Verde", categoria: "baly", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "imagens/baly-maca-verde-2l-2.jpg" },
    { id: 36, nome: "Baly Morango e P\u00eassego", categoria: "baly", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "imagens/baly-morango-pessego-2l-2.jpg" },
    { id: 37, nome: "Baly Tradicional", categoria: "baly", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "imagens/baly-tradicional-2l-2.jpg" },
    { id: 38, nome: "Baly Uva Verde", categoria: "baly", preco: 13.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "imagens/baly-uva-verde-2l-2.jpg" },
    { id: 79, nome: "Monster Tradicional", categoria: "monster", preco: 11.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/monster-tradicional-lata.jpg" },
    { id: 78, nome: "Monster Zero", categoria: "monster", preco: 11.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "imagens/monster-zero-lata-2.jpg" },
    { id: 80, nome: "Red Bull Tradicional", categoria: "redbull", preco: 12.00, volume: "250ml", descricao: "Lata 250ml gelada.", imagem: "imagens/redbull-tradicional-lata.jpg" },

    // --- REFRIGERANTES E AGUA ---
    { id: 39, nome: "Coca-Cola", categoria: "garrafas", preco: 14.00, volume: "2L", descricao: "Refrigerante 2L gelado.", imagem: "imagens/coca-cola-2l.jpg" },
    { id: 40, nome: "Coca-Cola Retorn\u00e1vel", categoria: "garrafas", preco: 10.00, volume: "2L", descricao: "Garrafa retorn\u00e1vel 2L.", imagem: "imagens/coca-cola-2l-retornavel.jpg" },
    { id: 41, nome: "Guaran\u00e1 Bol", categoria: "garrafas", preco: 7.00, volume: "2L", descricao: "Refrigerante gelado.", imagem: "imagens/guarana-bol-2l.jpg" },
    { id: 42, nome: "Fanta Lata", categoria: "latas", preco: 4.00, volume: "350ml", descricao: "Refrigerante lata gelado.", imagem: "imagens/fanta-lata-350ml.jpg" },
    { id: 43, nome: "H2O", categoria: "garrafas", preco: 6.50, volume: "500ml", descricao: "H2O gelado.", imagem: "imagens/h2o-500ml.jpg" },
    { id: 44, nome: "H2O", categoria: "garrafas", preco: 12.00, volume: "1,5L", descricao: "H2O gelado.", imagem: "imagens/h2o-1-5l.jpg" },
    // [REMOVIDO POR ENQUANTO - tire as // para voltar] { id: 45, nome: "\u00c1gua", categoria: "garrafas", preco: 2.00, volume: "", descricao: "\u00c1gua gelada.", imagem: "logo.jpg" },
    { id: 46, nome: "\u00c1gua com G\u00e1s", categoria: "garrafas", preco: 3.00, volume: "", descricao: "\u00c1gua com g\u00e1s gelada.", imagem: "imagens/agua-com-gas.jpg" },
    { id: 87, nome: "Coca-Cola Zero Lata", categoria: "latas", preco: 0.00, precoPendente: true, volume: "350ml", descricao: "Refrigerante lata gelado.", imagem: "imagens/coca-cola-zero-lata-350ml.jpg" },
    { id: 88, nome: "Sprite Lata", categoria: "latas", preco: 0.00, precoPendente: true, volume: "350ml", descricao: "Refrigerante lata gelado.", imagem: "imagens/sprite-lata-350ml.jpg" },
    { id: 89, nome: "Guaraná Antarctica Lata", categoria: "latas", preco: 0.00, precoPendente: true, volume: "350ml", descricao: "Refrigerante lata gelado.", imagem: "logo.jpg" },
    { id: 90, nome: "Fanta Uva Lata", categoria: "latas", preco: 0.00, precoPendente: true, volume: "350ml", descricao: "Refrigerante lata gelado.", imagem: "logo.jpg" },
    { id: 91, nome: "Água Mineral Cristalins", categoria: "garrafas", preco: 2.00, volume: "500ml", descricao: "Água mineral gelada.", imagem: "logo.jpg" },
    { id: 92, nome: "Suco Life Uva", categoria: "garrafas", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Suco de uva gelado.", imagem: "logo.jpg" },

    // --- DRINKS PRONTOS (Corote, Drinkball, Ice...) ---
    { id: 47, nome: "Corote Velho Barreiro", categoria: "drinks", preco: 5.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-velho-barreiro-500ml.jpg" },
    { id: 48, nome: "Corote Lim\u00e3o", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-limao-500ml.jpg" },
    { id: 49, nome: "Corote P\u00eassego", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-pessego-500ml.jpg" },
    { id: 50, nome: "Corote Morango", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-morango-500ml.jpg" },
    { id: 51, nome: "Corote Blueberry", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-blueberry-500ml.jpg" },
    { id: 52, nome: "Corote Baunilha com Lim\u00e3o", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-baunilha-limao-500ml.jpg" },
    { id: 53, nome: "Corote Melancia", categoria: "drinks", preco: 6.00, volume: "500ml", descricao: "Drink pronto gelado.", imagem: "imagens/corote-melancia-500ml.jpg" },
    { id: 54, nome: "Drinkball Doce de Leite", categoria: "drinks", preco: 7.00, volume: "300ml", descricao: "Drink pronto gelado.", imagem: "imagens/drinkball-doce-de-leite.jpg" },
    { id: 55, nome: "Drinkball Chocolate", categoria: "drinks", preco: 7.00, volume: "300ml", descricao: "Drink pronto gelado.", imagem: "imagens/drinkball-chocolate.jpg" },
    { id: 56, nome: "Askov Ice Lim\u00e3o", categoria: "drinks", preco: 7.00, volume: "275ml", descricao: "Drink pronto gelado.", imagem: "imagens/askov-ice-limao.jpg" },
    { id: 57, nome: "Askov Ice Maracuj\u00e1", categoria: "drinks", preco: 7.00, volume: "275ml", descricao: "Drink pronto gelado.", imagem: "imagens/askov-ice-maracuja.jpg" },
    { id: 58, nome: "Askov Ice Frutas Vermelhas", categoria: "drinks", preco: 7.00, volume: "275ml", descricao: "Drink pronto gelado.", imagem: "imagens/askov-ice-frutas-vermelhas.jpg" },
    { id: 59, nome: "Contini Ice Lim\u00e3o", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "imagens/contini-ice-limao.jpg" },
    { id: 60, nome: "Contini Ice Frutas Vermelhas", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "imagens/contini-ice-frutas-vermelhas.jpg" },
    { id: 61, nome: "Chopp de Vinho Stempel", categoria: "drinks", preco: 12.00, volume: "600ml", descricao: "Chopp de vinho gelado.", imagem: "imagens/chopp-vinho-stempel-600ml.jpg" },
    { id: 62, nome: "Stempel Red", categoria: "drinks", preco: 8.00, volume: "355ml", descricao: "Gelado.", imagem: "imagens/stempel-red-355ml.jpg" },

    // --- DESTILADOS ---
    { id: 63, nome: "Cacha\u00e7a 51", categoria: "destilados", preco: 18.00, volume: "965ml", descricao: "Cacha\u00e7a.", imagem: "imagens/cachaca-51.jpg" },
    { id: 64, nome: "Cacha\u00e7a Velho Barreiro", categoria: "destilados", preco: 18.00, volume: "965ml", descricao: "Cacha\u00e7a.", imagem: "imagens/cachaca-velho-barreiro.jpg" },
    { id: 65, nome: "Cacha\u00e7a Jamel", categoria: "destilados", preco: 18.00, volume: "965ml", descricao: "Cacha\u00e7a.", imagem: "imagens/cachaca-jamel.jpg" },
    { id: 66, nome: "Askov Maracuj\u00e1", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/askov-maracuja-900ml.jpg" },
    { id: 67, nome: "Askov Kiwi", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/askov-kiwi-900ml.jpg" },
    { id: 68, nome: "Askov Frutas Vermelhas", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/askov-frutas-vermelhas-900ml.jpg" },
    { id: 69, nome: "Askov Lim\u00e3o", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/askov-limao-900ml.jpg" },
    { id: 93, nome: "Vodka Askov", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 70, nome: "Conhaque Presidente", categoria: "destilados", preco: 25.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/conhaque-presidente-900ml.jpg" },
    { id: 71, nome: "Campari", categoria: "destilados", preco: 70.00, volume: "", descricao: "Garrafa.", imagem: "imagens/campari.jpg" },
    { id: 75, nome: "Gin Invictus Strawberry", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/gin-invictus-strawberry-900ml.jpg" },
    { id: 76, nome: "Gin Invictus Melancia", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/gin-invictus-melancia-900ml.jpg" },
    { id: 77, nome: "Gin Invictus Tropical", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "imagens/gin-invictus-tropical-900ml.jpg" },
    { id: 81, nome: "Gin Invictus Maçã Verde", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 82, nome: "Busca Brisa Psico Spirit", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "1L", descricao: "Garrafa 1L.", imagem: "logo.jpg" },
    { id: 83, nome: "Vinho Góes Quinta dos Vinhedos Tinto Seco", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "1L", descricao: "Vinho de mesa tinto seco 1L.", imagem: "logo.jpg" },
    { id: 84, nome: "Vinho Góes Quinta dos Vinhedos Tinto Suave", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "1L", descricao: "Vinho de mesa tinto suave 1L.", imagem: "logo.jpg" },
    { id: 85, nome: "Smirnoff Vodka", categoria: "destilados", preco: 0.00, precoPendente: true, volume: "", descricao: "Vodka.", imagem: "logo.jpg" },

    // --- GELO ---
    { id: 72, nome: "Gelo", categoria: "gelo", preco: 8.50, volume: "2,5kg", descricao: "Pacote de gelo 2,5kg.", imagem: "imagens/gelo-2-5kg.jpg" },
    { id: 73, nome: "Gelo", categoria: "gelo", preco: 15.00, volume: "5kg", descricao: "Pacote de gelo 5kg.", imagem: "imagens/gelo-5kg.jpg" },
    { id: 74, nome: "Gelo de Sabor", categoria: "gelo", preco: 4.00, volume: "Unidade", descricao: "Gelo de sabor (unidade).", imagem: "imagens/gelo-de-sabor.jpg", sabores: ["\u00c1gua de Coco", "Gelo Brisa", "Morango", "Maracuj\u00e1", "Ma\u00e7\u00e3 Verde", "Melancia"] }
];