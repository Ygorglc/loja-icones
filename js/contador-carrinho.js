function atualizarContadorCarrinho() {

    const carrinho =
        JSON.parse(
            localStorage.getItem(
                'carrinho'
            )
        ) || [];

    const quantidadeTotal =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );

    const contador =
        document.getElementById(
            'contadorCarrinho'
        );

    if(contador){

        contador.textContent =
            quantidadeTotal;

    }

}

document.addEventListener(
    'DOMContentLoaded',
    atualizarContadorCarrinho
);
