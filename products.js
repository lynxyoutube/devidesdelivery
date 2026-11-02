
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

    // --- CERVEJAS (aba "Cervejas") ---
    {
        id: 7,
        nome: "Cerveja Conti Zero Grau Lata 269ml",
        categoria: "cervejas",
        preco: 2.50,
        volume: "269ml",
        descricao: "Lata 269ml zero grau gelada.",
        imagem: "imagens/conti-zero-grau-lata.jpg"
    },

    // --- ENERGETICOS ---
    {
        id: 6,
        nome: "Energético Baly Lata 473ml (Melancia)",
        categoria: "energeticos",
        preco: 8.00,
        volume: "473ml",
        descricao: "Lata 473ml melancia gelada.",
        imagem: "imagens/baly-melancia-lata.jpg"
    },
    {
        id: 8,
        nome: "Energ\u00e9tico Baly Lata 473ml (Ma\u00e7\u00e3 Verde)",
        categoria: "energeticos",
        preco: 8.00,
        volume: "473ml",
        descricao: "Lata 473ml ma\u00e7\u00e3 verde gelada.",
        imagem: "imagens/baly-maca-verde-lata.jpg"
    }
];