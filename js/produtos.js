let produtos = [];

let produtosFiltrados = [];

let paginaAtual = 1;

const produtosPorPagina = 12;

function removerAcentos(texto) {

return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

}

async function carregarProdutos() {

const resposta =
    await fetch('data/produtos.json');

produtos =
    await resposta.json();

produtosFiltrados =
    produtos;

renderizarProdutos(
    produtosFiltrados
);

}

function renderizarProdutos(listaProdutos) {

const container =
    document.querySelector('.produtos');

container.innerHTML = "";

const inicio =
    (paginaAtual - 1)
    * produtosPorPagina;

const fim =
    inicio + produtosPorPagina;

const produtosPagina =
    listaProdutos.slice(
        inicio,
        fim
    );

produtosPagina.forEach(produto => {

    const card =
        document.createElement('div');

    card.classList.add('produto');

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
    `;

    card.addEventListener(
        'click',
        () => {

            window.location.href =
                `produto.html?id=${produto.id}`;

        }
    );

    container.appendChild(card);

});

atualizarPaginacao();

}

function atualizarPaginacao() {

const totalPaginas =
    Math.ceil(
        produtosFiltrados.length
        / produtosPorPagina
    );

document.getElementById(
    'paginaAtual'
).textContent =
    `${paginaAtual} / ${totalPaginas || 1}`;

document.getElementById(
    'btnAnterior'
).disabled =
    paginaAtual === 1;

document.getElementById(
    'btnProxima'
).disabled =
    paginaAtual === totalPaginas
    || totalPaginas === 0;

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

const nomeSemAcento =
    removerAcentos(nome);

const filtrados =
    produtos.filter(produto => {

        const atendeTipo =
            !tipo ||
            produto.tipo.toLowerCase() === tipo;

        const atendeNome =
            !nome ||
            removerAcentos(
                produto.nome.toLowerCase()
            ).includes(
                nomeSemAcento
            );

        return (
            atendeTipo &&
            atendeNome
        );

    });

paginaAtual = 1;

produtosFiltrados =
    filtrados;

renderizarProdutos(
    produtosFiltrados
);

}

document.addEventListener(
'DOMContentLoaded',
() => {

    carregarProdutos();

    document
        .getElementById(
            'btnPesquisar'
        )
        .addEventListener(
            'click',
            pesquisarProdutos
        );

    document
        .getElementById(
            'filtroTipo'
        )
        .addEventListener(
            'change',
            pesquisarProdutos
        );

    document
        .getElementById(
            'filtroNome'
        )
        .addEventListener(
            'keypress',
            function(event){

                if(
                    event.key === 'Enter'
                ){

                    pesquisarProdutos();

                }

            }
        );

    document
        .getElementById(
            'btnAnterior'
        )
        .addEventListener(
            'click',
            () => {

                if(
                    paginaAtual > 1
                ){

                    paginaAtual--;

                    renderizarProdutos(
                        produtosFiltrados
                    );

                }

            }
        );

    document
        .getElementById(
            'btnProxima'
        )
        .addEventListener(
            'click',
            () => {

                const totalPaginas =
                    Math.ceil(
                        produtosFiltrados.length /
                        produtosPorPagina
                    );

                if(
                    paginaAtual <
                    totalPaginas
                ){

                    paginaAtual++;

                    renderizarProdutos(
                        produtosFiltrados
                    );

                }

            }
        );

}

);
