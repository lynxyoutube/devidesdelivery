// CONFIGURAÇÃO DA SUA LOJA
const CONFIG = {
    nomeLoja: "Devides Delivery",
    slogan: "Pediu, chegou, gelou!",
    // COLOQUE SEU NÚMERO DE WHATSAPP AQUI COM O SEU DDD (Ex: 55 + DDD + 996049894)
    whatsapp: "5511996049894", 
    taxaEntregaFixa: 0.00, // Deixe 0 se a taxa for calculada pelo endereço ou grátis
    mensagemAviso: "Pediu, chegou, gelou! • Distribuidora de Bebidas • Delivery e Retirada"
};

// CATÁLOGO DE BEBIDAS
// Você pode alterar os preços, nomes e adicionar quantos produtos quiser aqui!
const PRODUTOS = [
    // --- ENERGÉTICOS ---
    {
        id: 1,
        nome: "Energético Baly 2 Litros (Tradicional)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L tradicional bem gelada.",
        imagem: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        nome: "Energético Baly 2 Litros (Melancia)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor melancia gelada.",
        imagem: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        nome: "Energético Baly 2 Litros (Maçã Verde)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor maçã verde.",
        imagem: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        nome: "Energético Baly 2 Litros (Tropical)",
        categoria: "energeticos",
        preco: 13.90,
        volume: "2 Litros",
        descricao: "Garrafa 2L sabor tropical.",
        imagem: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        nome: "Energético Baly Lata 473ml (Tradicional)",
        categoria: "energeticos",
        preco: 6.50,
        volume: "473ml",
        descricao: "Lata 473ml gelada.",
        imagem: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        nome: "Energético Baly Lata 473ml (Melancia)",
        categoria: "energeticos",
        preco: 6.50,
        volume: "473ml",
        descricao: "Lata 473ml melancia gelada.",
        imagem: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60"
    },

    // --- CERVEJAS ---
    {
        id: 7,
        nome: "Cerveja Skol Lata 350ml",
        categoria: "cervejas",
        preco: 4.00,
        volume: "350ml",
        descricao: "Lata 350ml gelada.",
        imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        nome: "Cerveja Skol Latão 473ml",
        categoria: "cervejas",
        preco: 5.50,
        volume: "473ml",
        descricao: "Latão 473ml bem gelado.",
        imagem: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        nome: "Fardo Skol Lata (12 Unidades)",
        categoria: "cervejas",
        preco: 45.00,
        volume: "12x 350ml",
        descricao: "Pacote fechado com 12 latas.",
        imagem: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        nome: "Cerveja Heineken Long Neck 330ml",
        categoria: "cervejas",
        preco: 8.50,
        volume: "330ml",
        descricao: "Long neck 330ml gelada.",
        imagem: "https://images.unsplash.com/photo-1618886614638-80e3c15cd895?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        nome: "Cerveja Brahma Duplo Malte 350ml",
        categoria: "cervejas",
        preco: 4.80,
        volume: "350ml",
        descricao: "Lata 350ml gelada.",
        imagem: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&auto=format&fit=crop&q=60"
    },

    // --- DESTILADOS & GINS ---
    {
        id: 12,
        nome: "Gin Nacional (Gin de 10)",
        categoria: "destilados",
        preco: 10.00,
        volume: "Garrafinha",
        descricao: "Garrafinha dose para misturar com Baly.",
        imagem: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 13,
        nome: "Gin Rocks 1 Litro",
        categoria: "destilados",
        preco: 32.00,
        volume: "1 Litro",
        descricao: "Garrafa 1 Litro lacrada.",
        imagem: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 14,
        nome: "Vodka Smirnoff 998ml",
        categoria: "destilados",
        preco: 42.00,
        volume: "998ml",
        descricao: "Garrafa 998ml original.",
        imagem: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 15,
        nome: "Whisky Red Label 1L",
        categoria: "destilados",
        preco: 98.00,
        volume: "1 Litro",
        descricao: "Garrafa 1 Litro original lacrada.",
        imagem: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&auto=format&fit=crop&q=60"
    },

    // --- REFRIGERANTES & GELO ---
    {
        id: 16,
        nome: "Coca-Cola Original 2 Litros",
        categoria: "refrigerantes",
        preco: 11.50,
        volume: "2 Litros",
        descricao: "Garrafa 2L gelada.",
        imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 17,
        nome: "Guaraná Antarctica 2 Litros",
        categoria: "refrigerantes",
        preco: 9.50,
        volume: "2 Litros",
        descricao: "Garrafa 2L gelada.",
        imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 18,
        nome: "Saco de Gelo em Cubos 5kg",
        categoria: "gelo",
        preco: 12.00,
        volume: "5kg",
        descricao: "Pacote de gelo em cubos 5kg.",
        imagem: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 19,
        nome: "Gelo de Sabor Maracujá / Coco",
        categoria: "gelo",
        preco: 4.50,
        volume: "Copão",
        descricao: "Gelo saborizado para drinks.",
        imagem: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&auto=format&fit=crop&q=60"
    }
];
