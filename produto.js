async function carregarProduto() {

    const params =
        new URLSearchParams(window.location.search);

    const id =
        params.get("id");

    const resposta =
        await fetch("data/produtos.json");

    const produtos =
        await resposta.json();

    const produto =
        produtos.find(p => p.id == id);

    const container =
        document.getElementById("produto-detalhe");

    if(!produto){
        container.innerHTML = "Produto não encontrado";
        return;
    }

    container.innerHTML = `
        <div style="max-width:600px;margin:auto;text-align:center">

            <img src="${produto.imagem}" style="width:100%;border-radius:10px">

            <h1>${produto.nome}</h1>

            <p>R$ ${produto.preco.toFixed(2)}</p>

        </div>
    `;
}

carregarProduto();
