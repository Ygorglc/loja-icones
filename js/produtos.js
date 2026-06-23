let produtos = [];

async function carregarProdutos() {

    const resposta =
        await fetch('data/produtos.json');

    produtos =
        await resposta.json();

    renderizarProdutos(produtos);

}

function renderizarProdutos(listaProdutos) {

    const container =
        document.querySelector('.produtos');

    container.innerHTML = "";

    listaProdutos.forEach(produto => {

        const card =
            document.createElement('div');

        card.classList.add('produto');

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
        `;

        container.appendChild(card);

    });

}

function pesquisarProdutos() {

    const tipo =
        document
            .getElementById('filtroTipo')
            .value
            .toLowerCase();

    const nome =
        document
            .getElementById('filtroNome')
            .value
            .toLowerCase();

    const filtrados =
        produtos.filter(produto => {

            const atendeTipo =
                !tipo ||
                produto.tipo.toLowerCase() === tipo;

            const atendeNome =
                !nome ||
                produto.nome
                    .toLowerCase()
                    .includes(nome);

            return atendeTipo && atendeNome;

        });

    renderizarProdutos(filtrados);

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarProdutos();

        document
            .getElementById('btnPesquisar')
            .addEventListener(
                'click',
                pesquisarProdutos
            );

        document
            .getElementById('filtroTipo')
            .addEventListener(
                'change',
                pesquisarProdutos
            );

        document
            .getElementById('filtroNome')
            .addEventListener(
                'keypress',
                function(event){

                    if(event.key === 'Enter'){
                        pesquisarProdutos();
                    }

                }
            );

    }
);
