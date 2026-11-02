
// CONFIGURAÇÃO DA SUA LOJA
const CONFIG = {
    nomeLoja: "Devides Delivery",
    slogan: "Pediu, chegou, gelou!",
    // WhatsApp da loja: 55 + DDD + número (+55 18 99604-9894)
    whatsapp: "5518998198935", // TESTE (voltar para 5518996049894 = numero original da loja) 
    taxaEntregaFixa: 2.00, // Taxa fixa de entrega (não é cobrada na retirada no local)
    // Etiqueta verde pequena em cima da foto (mostra o campo volume do produto). true = mostrar
    mostrarEtiquetaVolume: false,
    // Categorias com bebida alcoólica: ficam bloqueadas para quem disser que é menor de 18 anos
    categoriasAlcoolicas: ["cervejas", "longneck", "drinks", "combos", "destilados"],
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
    { id: 9, nome: "Conti Romarinho (269ml)", categoria: "cervejas", preco: 2.50, volume: "Romarinho", descricao: "Cerveja gelada.", imagem: "imagens/conti-romarinho.png" },
    { id: 10, nome: "Conti Lata (350ml)", categoria: "cervejas", preco: 3.25, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/conti-lata.png" },
    { id: 11, nome: "Conti Lat\u00e3o (473ml)", categoria: "cervejas", preco: 4.25, volume: "Lat\u00e3o", descricao: "Cerveja gelada.", imagem: "imagens/conti-latao.png" },
    { id: 12, nome: "Moinho Real Lata (350ml)", categoria: "cervejas", preco: 4.00, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/moinho-real-lata.png" },
    { id: 13, nome: "Moinho Real Ultra (350ml)", categoria: "cervejas", preco: 5.00, volume: "", descricao: "Cerveja gelada.", imagem: "imagens/moinho-real-ultra.png" },
    { id: 14, nome: "Skol Lata (350ml)", categoria: "cervejas", preco: 3.70, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/skol-lata.png" },
    { id: 15, nome: "Brahma Lata (350ml)", categoria: "cervejas", preco: 3.99, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/brahma-lata.png" },
    { id: 16, nome: "Antarctica Lata (350ml)", categoria: "cervejas", preco: 3.99, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/antarctica-lata.png" },
    { id: 17, nome: "Amstel Lata (350ml)", categoria: "cervejas", preco: 3.99, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/amstel-lata.png" },
    { id: 18, nome: "Imp\u00e9rio Lata (350ml)", categoria: "cervejas", preco: 3.89, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/imperio-lata.png" },
    { id: 19, nome: "Heineken Lata (350ml)", categoria: "cervejas", preco: 6.00, volume: "Lata", descricao: "Cerveja gelada.", imagem: "imagens/heineken-lata.png" },
    { id: 20, nome: "Brahma Romarinho (269ml)", categoria: "cervejas", preco: 2.99, volume: "Romarinho", descricao: "Cerveja gelada.", imagem: "imagens/brahma-romarinho.png" },
    { id: 21, nome: "Skol Romarinho (300ml)", categoria: "cervejas", preco: 2.99, volume: "Romarinho", descricao: "Cerveja gelada.", imagem: "imagens/skol-romarinho.png" },
    { id: 22, nome: "Antarctica Romarinho (269ml)", categoria: "cervejas", preco: 2.99, volume: "Romarinho", descricao: "Cerveja gelada.", imagem: "logo.jpg" },
    { id: 23, nome: "Original", categoria: "cervejas", preco: 3.79, volume: "", descricao: "Cerveja gelada.", imagem: "logo.jpg" },

    // --- LONG NECK ---
    { id: 24, nome: "Heineken", categoria: "longneck", preco: 7.00, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },
    { id: 25, nome: "Heineken Zero", categoria: "longneck", preco: 7.50, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },
    { id: 26, nome: "Amstel Ultra", categoria: "longneck", preco: 7.50, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },
    { id: 27, nome: "Spaten", categoria: "longneck", preco: 7.79, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },
    { id: 28, nome: "Moinho Real", categoria: "longneck", preco: 3.50, volume: "Long Neck", descricao: "Long neck gelada.", imagem: "logo.jpg" },

    // --- ENERGETICOS ---
    { id: 6, nome: "Baly Melancia (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml melancia gelada.", imagem: "imagens/baly-melancia-lata.jpg" },
    { id: 8, nome: "Baly Ma\u00e7\u00e3 Verde (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml ma\u00e7\u00e3 verde gelada.", imagem: "imagens/baly-maca-verde-lata.jpg" },
    { id: 29, nome: "Baly Tradicional (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "logo.jpg" },
    { id: 30, nome: "Baly Morango e P\u00eassego (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "logo.jpg" },
    { id: 31, nome: "Baly Coco e A\u00e7a\u00ed (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "logo.jpg" },
    { id: 32, nome: "Baly Frutas Tropicais (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "logo.jpg" },
    { id: 33, nome: "Baly Tradicional Sem A\u00e7\u00facar (473ml)", categoria: "energeticos", preco: 8.00, volume: "473ml", descricao: "Lata 473ml gelada.", imagem: "logo.jpg" },
    { id: 34, nome: "Baly Melancia 2L", categoria: "energeticos", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "logo.jpg" },
    { id: 35, nome: "Baly Ma\u00e7\u00e3 Verde 2L", categoria: "energeticos", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "logo.jpg" },
    { id: 36, nome: "Baly Morango e P\u00eassego 2L", categoria: "energeticos", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "logo.jpg" },
    { id: 37, nome: "Baly Tradicional 2L", categoria: "energeticos", preco: 12.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "logo.jpg" },
    { id: 38, nome: "Baly Uva Verde 2L", categoria: "energeticos", preco: 13.00, volume: "2L", descricao: "Energ\u00e9tico 2L gelado.", imagem: "logo.jpg" },

    // --- REFRIGERANTES E AGUA ---
    { id: 39, nome: "Coca-Cola 2L", categoria: "refrigerantes", preco: 14.00, volume: "2L", descricao: "Refrigerante 2L gelado.", imagem: "logo.jpg" },
    { id: 40, nome: "Coca-Cola 2L Retorn\u00e1vel", categoria: "refrigerantes", preco: 10.00, volume: "2L", descricao: "Garrafa retorn\u00e1vel 2L.", imagem: "logo.jpg" },
    { id: 41, nome: "Guaran\u00e1 Bol", categoria: "refrigerantes", preco: 7.00, volume: "", descricao: "Refrigerante gelado.", imagem: "logo.jpg" },
    { id: 42, nome: "Fanta Lata (350ml)", categoria: "refrigerantes", preco: 4.00, volume: "Lata", descricao: "Refrigerante lata gelado.", imagem: "logo.jpg" },
    { id: 43, nome: "H2O (500ml)", categoria: "refrigerantes", preco: 6.50, volume: "500ml", descricao: "H2O gelado.", imagem: "logo.jpg" },
    { id: 44, nome: "H2O 1,5L", categoria: "refrigerantes", preco: 12.00, volume: "1,5L", descricao: "H2O gelado.", imagem: "logo.jpg" },
    { id: 45, nome: "\u00c1gua", categoria: "refrigerantes", preco: 2.00, volume: "", descricao: "\u00c1gua gelada.", imagem: "logo.jpg" },
    { id: 46, nome: "\u00c1gua com G\u00e1s", categoria: "refrigerantes", preco: 3.00, volume: "", descricao: "\u00c1gua com g\u00e1s gelada.", imagem: "logo.jpg" },

    // --- DRINKS PRONTOS (Corote, Drinkball, Ice...) ---
    { id: 47, nome: "Corote Velho Barreiro (500ml)", categoria: "drinks", preco: 5.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 48, nome: "Corote Lim\u00e3o (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 49, nome: "Corote P\u00eassego (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 50, nome: "Corote Morango (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 51, nome: "Corote Blueberry (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 52, nome: "Corote Baunilha com Lim\u00e3o (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 53, nome: "Corote Melancia (500ml)", categoria: "drinks", preco: 6.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 54, nome: "Drinkball Doce de Leite", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 55, nome: "Drinkball Chocolate", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 56, nome: "Askov Ice Lim\u00e3o", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 57, nome: "Askov Ice Maracuj\u00e1", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 58, nome: "Askov Ice Frutas Vermelhas", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 59, nome: "Contini Ice Lim\u00e3o", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 60, nome: "Contini Ice Frutas Vermelhas", categoria: "drinks", preco: 7.00, volume: "", descricao: "Drink pronto gelado.", imagem: "logo.jpg" },
    { id: 61, nome: "Chopp de Vinho Stempel (600ml)", categoria: "drinks", preco: 12.00, volume: "600ml", descricao: "Chopp de vinho gelado.", imagem: "logo.jpg" },
    { id: 62, nome: "Stempel Red (355ml)", categoria: "drinks", preco: 8.00, volume: "355ml", descricao: "Gelado.", imagem: "logo.jpg" },

    // --- DESTILADOS ---
    { id: 63, nome: "Cacha\u00e7a 51", categoria: "destilados", preco: 18.00, volume: "", descricao: "Cacha\u00e7a.", imagem: "logo.jpg" },
    { id: 64, nome: "Cacha\u00e7a Velho Barreiro", categoria: "destilados", preco: 18.00, volume: "", descricao: "Cacha\u00e7a.", imagem: "logo.jpg" },
    { id: 65, nome: "Cacha\u00e7a Jamel", categoria: "destilados", preco: 18.00, volume: "", descricao: "Cacha\u00e7a.", imagem: "logo.jpg" },
    { id: 66, nome: "Askov Maracuj\u00e1 (900ml)", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 67, nome: "Askov Kiwi (900ml)", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 68, nome: "Askov Frutas Vermelhas (900ml)", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 69, nome: "Askov Lim\u00e3o (900ml)", categoria: "destilados", preco: 20.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 70, nome: "Conhaque Presidente (900ml)", categoria: "destilados", preco: 25.00, volume: "900ml", descricao: "Garrafa 900ml.", imagem: "logo.jpg" },
    { id: 71, nome: "Campari", categoria: "destilados", preco: 70.00, volume: "", descricao: "Garrafa.", imagem: "logo.jpg" },

    // --- GELO ---
    { id: 72, nome: "Gelo 2,5kg", categoria: "gelo", preco: 8.50, volume: "2,5kg", descricao: "Pacote de gelo 2,5kg.", imagem: "logo.jpg" },
    { id: 73, nome: "Gelo 5kg", categoria: "gelo", preco: 15.00, volume: "5kg", descricao: "Pacote de gelo 5kg.", imagem: "logo.jpg" },
    { id: 74, nome: "Gelo de Sabor", categoria: "gelo", preco: 4.00, volume: "Unidade", descricao: "Gelo de sabor (unidade).", imagem: "logo.jpg" }
];