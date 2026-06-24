function carregarCarrinho() {

    const carrinho =
        JSON.parse(
            localStorage.getItem(
                'carrinho'
            )
        ) || [];

    const lista =
        document.getElementById(
            'listaCarrinho'
        );

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {

        const subtotal =
            item.valor *
            item.quantidade;

        total += subtotal;

        const card =
            document.createElement('div');

        card.classList.add(
            'item-carrinho'
        );

        card.innerHTML = `
            <img src="${item.imagem}">

            <div>

                <h3>${item.nome}</h3>

                <p>
                    Tipo:
                    ${item.tipo}
                </p>

                <p>
                    Tamanho:
                    ${item.tamanho}
                </p>

                <p>
                    Quantidade:
                    ${item.quantidade}
                </p>

                <p>
                    Valor:
                    ${subtotal.toLocaleString(
                        'pt-BR',
                        {
                            style:'currency',
                            currency:'BRL'
                        }
                    )}
                </p>

            </div>
        `;

        lista.appendChild(card);

    });

    document.getElementById(
        'valorTotal'
    ).textContent =
        total.toLocaleString(
            'pt-BR',
            {
                style:'currency',
                currency:'BRL'
            }
        );

}

document.addEventListener(
    'DOMContentLoaded',
    carregarCarrinho
);
