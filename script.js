async function carregarProdutos() { 

    const resposta =
        await fetch('data/produtos.json');

    const produtos =
        await resposta.json();

    const container =
        document.querySelector('.produtos');

    produtos.forEach(produto => {

        container.innerHTML += `
            <div class="produto">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    R$ ${produto.preco.toFixed(2)}
                </p>

            </div>
        `;
    });
}

carregarProdutos();
