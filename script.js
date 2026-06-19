async function carregarProdutos() {

    const resposta =
        await fetch('data/produtos.json');

    const produtos =
        await resposta.json();

    const container =
        document.querySelector('.produtos');

    container.innerHTML = "";

    produtos.forEach(produto => {

        const card = document.createElement("div");
        card.classList.add("produto");

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
        `;

        card.addEventListener("click", () => {
            window.open(
                `produto.html?id=${produto.id}`,
                "_blank"
            );
        });

        container.appendChild(card);
    });
}

carregarProdutos();
