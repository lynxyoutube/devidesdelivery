
// CONFIGURAÇÃO DA SUA LOJA
const CONFIG = {
    nomeLoja: "Devides Delivery",
    slogan: "Pediu, chegou, gelou!",
    // WhatsApp da loja: 55 + DDD + número (+55 18 99604-9894)
    whatsapp: "5518998198935", // TESTE (voltar para 5518996049894 = numero original da loja) 
    taxaEntregaFixa: 2.00, // Taxa fixa de entrega (não é cobrada na retirada no local)
    // Categorias com bebida alcoólica: ficam bloqueadas para quem disser que é menor de 18 anos
    categoriasAlcoolicas: ["cervejas", "combos", "destilados"],
    mensagemAviso: "Pediu, chegou, gelou! • Distribuidora de Bebidas • Delivery e Retirada"
};

// CATÁLOGO DE BEBIDAS
// Você pode alterar os preços, nomes e adicionar quantos produtos quiser aqui!
// As fotos abaixo são apenas de demonstração (Unsplash). Troque pelas fotos reais dos seus produtos
// colocando o arquivo na pasta do site e usando o nome dele, ex: imagem: "baly-tradicional.jpg"
const PRODUTOS = [
    // --- COMBOS (aba "Combos") ---
    // Para adicionar um combo, copie o modelo abaixo, tire as barras // do inicio e preencha:
    // { id: 20, nome: "Combo Gin + Baly 2L", categoria: "combos", preco: 0.00, volume: "Combo", descricao: "O que vem no combo.", imagem: "imagens/combo-gin-baly.jpg" },

    // --- ENERGÉTICOS ---
    {
        id: 1,
        nome: "Energético Baly 2 Litros (Tradicional)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L tradicional bem gelada.",
        imagem: "imagens/energetico-monster.jpg"
    },
    {
        id: 2,
        nome: "Energético Baly 2 Litros (Melancia)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor melancia gelada.",
        imagem: "imagens/energetico-redbull.jpg"
    },
    {
        id: 3,
        nome: "Energético Baly 2 Litros (Maçã Verde)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor maçã verde.",
        imagem: "imagens/energetico-verde.jpg"
    },
    {
        id: 4,
        nome: "Energético Baly 2 Litros (Tropical)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor tropical.",
        imagem: "imagens/energetico-monster.jpg"
    },
    {
        id: 5,
        nome: "Energético Baly Lata 473ml (Tradicional)",
        categoria: "energeticos",
        preco: 6.50,
        volume: "473ml",
        descricao: "Lata 473ml gelada.",
        imagem: "imagens/energetico-redbull.jpg"
    },
    {
        id: 6,
        nome: "Energético Baly Lata 473ml (Melancia)",
        categoria: "energeticos",
        preco: 6.50,
        volume: "473ml",
        descricao: "Lata 473ml melancia gelada.",
        imagem: "imagens/energetico-verde.jpg"
    },

    // --- CERVEJAS ---
    {
        id: 7,
        nome: "Cerveja Skol Lata 350ml",
        categoria: "cervejas",
        preco: 4.00,
        volume: "350ml",
        descricao: "Lata 350ml gelada.",
        imagem: "imagens/cerveja-lata-2.jpg"
    },
    {
        id: 8,
        nome: "Cerveja Skol Latão 473ml",
        categoria: "cervejas",
        preco: 5.50,
        volume: "473ml",
        descricao: "Latão 473ml bem gelado.",
        imagem: "imagens/cerveja-lata-1.jpg"
    },
    {
        id: 9,
        nome: "Fardo Skol Lata (12 Unidades)",
        categoria: "cervejas",
        preco: 45.00,
        volume: "12x 350ml",
        descricao: "Pacote fechado com 12 latas.",
        imagem: "imagens/cerveja-fardo.jpg"
    },
    {
        id: 10,
        nome: "Cerveja Heineken Long Neck 330ml",
        categoria: "cervejas",
        preco: 8.50,
        volume: "330ml",
        descricao: "Long neck 330ml gelada.",
        imagem: "imagens/cerveja-lata-3.jpg"
    },
    {
        id: 11,
        nome: "Cerveja Brahma Duplo Malte 350ml",
        categoria: "cervejas",
        preco: 4.80,
        volume: "350ml",
        descricao: "Lata 350ml gelada.",
        imagem: "imagens/cerveja-lata-2.jpg"
    },

    // --- DESTILADOS & GINS ---
    {
        id: 12,
        nome: "Gin Nacional (Gin de 10)",
        categoria: "destilados",
        preco: 10.00,
        volume: "Garrafinha",
        descricao: "Garrafinha dose para misturar com Baly.",
        imagem: "imagens/gin-1.jpg"
    },
    {
        id: 13,
        nome: "Gin Rocks 1 Litro",
        categoria: "destilados",
        preco: 32.00,
        volume: "1 Litro",
        descricao: "Garrafa 1 Litro lacrada.",
        imagem: "imagens/gin-2.jpg"
    },
    {
        id: 14,
        nome: "Vodka Smirnoff 998ml",
        categoria: "destilados",
        preco: 42.00,
        volume: "998ml",
        descricao: "Garrafa 998ml original.",
        imagem: "imagens/vodka.jpg"
    },
    {
        id: 15,
        nome: "Whisky Red Label 1L",
        categoria: "destilados",
        preco: 98.00,
        volume: "1 Litro",
        descricao: "Garrafa 1 Litro original lacrada.",
        imagem: "imagens/whisky.jpg"
    },

    // --- REFRIGERANTES & GELO ---
    {
        id: 16,
        nome: "Coca-Cola Original 2 Litros",
        categoria: "refrigerantes",
        preco: 11.50,
        volume: "2 Litros",
        descricao: "Garrafa 2L gelada.",
        imagem: "imagens/refrigerante-cola.jpg"
    },
    {
        id: 17,
        nome: "Guaraná Antarctica 2 Litros",
        categoria: "refrigerantes",
        preco: 9.50,
        volume: "2 Litros",
        descricao: "Garrafa 2L gelada.",
        imagem: "imagens/refrigerante-cola.jpg"
    },
    {
        id: 18,
        nome: "Saco de Gelo em Cubos 5kg",
        categoria: "gelo",
        preco: 12.00,
        volume: "5kg",
        descricao: "Pacote de gelo em cubos 5kg.",
        imagem: "imagens/gelo.jpg"
    },
    {
        id: 19,
        nome: "Gelo de Sabor Maracujá / Coco",
        categoria: "gelo",
        preco: 4.50,
        volume: "Copão",
        descricao: "Gelo saborizado para drinks.",
        imagem: "imagens/gelo.jpg"
    }
];