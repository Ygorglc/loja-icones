let produto = null;
let precos = null;
let quantidade = 1;

async function carregarProduto() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(
            parametros.get('id')
        );

    const respostaProdutos =
        await fetch('data/produtos.json');

    const produtos =
        await respostaProdutos.json();

    produto =
        produtos.find(
            p => p.id === id
        );

    const respostaPrecos =
        await fetch('data/precos.json');

    precos =
        await respostaPrecos.json();

    preencherTela();

}

function preencherTela() {

    document.getElementById(
        'produtoImagem'
    ).src =
        produto.imagem;

    document.getElementById(
        'produtoNome'
    ).textContent =
        produto.nome;

    document.getElementById(
        'produtoTipo'
    ).textContent =
        produto.tipo;

    atualizarPreco();

}

function atualizarPreco() {

    const tamanho =
        document.getElementById(
            'tamanho'
        ).value;

    const valor =
        precos[
            produto.tipo
        ][
            tamanho
        ];

    const total =
        valor * quantidade;

    document.getElementById(
        'preco'
    ).textContent =
        total.toLocaleString(
            'pt-BR',
            {
                style:'currency',
                currency:'BRL'
            }
        );

}

function aumentarQuantidade() {

    quantidade++;

    document.getElementById(
        'quantidade'
    ).textContent =
        quantidade;

    atualizarPreco();

}

function diminuirQuantidade() {

    if (quantidade > 1) {

        quantidade--;

        document.getElementById(
            'quantidade'
        ).textContent =
            quantidade;

        atualizarPreco();

    }

}

function adicionarAoCarrinho() {

    const tamanho =
        document.getElementById(
            'tamanho'
        ).value;

    const valor =
        precos[
            produto.tipo
        ][
            tamanho
        ];

    const item = {

        id: produto.id,

        nome: produto.nome,

        imagem: produto.imagem,

        tipo: produto.tipo,

        tamanho: tamanho,

        quantidade: quantidade,

        valor: valor

    };

    let carrinho =
        JSON.parse(
            localStorage.getItem(
                'carrinho'
            )
        ) || [];

    carrinho.push(item);

    localStorage.setItem(
        'carrinho',
        JSON.stringify(
            carrinho
        )
    );

    alert(
        'Produto adicionado ao carrinho!'
    );

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarProduto();

        document
            .getElementById('tamanho')
            .addEventListener(
                'change',
                atualizarPreco
            );

        document
            .getElementById('mais')
            .addEventListener(
                'click',
                aumentarQuantidade
            );

        document
            .getElementById('menos')
            .addEventListener(
                'click',
                diminuirQuantidade
            );

        document
            .getElementById(
                'btnCarrinho'
            )
            .addEventListener(
                'click',
                adicionarAoCarrinho
            );

    }
);
