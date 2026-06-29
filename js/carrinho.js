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

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarCarrinho();

        document
            .getElementById('btnFinalizar')
            .addEventListener(
                'click',
                finalizarPedido
            );

    }
);

function finalizarPedido() {

    const carrinho =
        JSON.parse(
            localStorage.getItem(
                'carrinho'
            )
        ) || [];

    if(carrinho.length === 0){

        alert(
            'Seu carrinho está vazio.'
        );

        return;
    }

    const agora =
        new Date();

    const data =
        agora.toLocaleDateString(
            'pt-BR'
        );

    const hora =
        agora.toLocaleTimeString(
            'pt-BR'
        );

    let mensagem =
        'Olá, gostaria de fazer o seguinte pedido:%0A%0A';

    mensagem +=
        `Data: ${data}%0A`;

    mensagem +=
        `Hora: ${hora}%0A`;

    mensagem +=
        `%0A`;

    let total = 0;

    carrinho.forEach(item => {

        const subtotal =
            item.valor *
            item.quantidade;

        total += subtotal;

        mensagem +=
            `Código: ${item.id}%0A`;

        mensagem +=
            `Produto: ${item.nome}%0A`;

        mensagem +=
            `Tipo: ${item.tipo}%0A`;

        mensagem +=
            `Tamanho: ${item.tamanho}%0A`;

        mensagem +=
            `Quantidade: ${item.quantidade}%0A`;

        mensagem +=
            `Valor: ${subtotal.toLocaleString(
                'pt-BR',
                {
                    style: 'currency',
                    currency: 'BRL'
                }
            )}%0A`;

        mensagem +=
            `--------------------%0A`;

    });

    mensagem +=
        `%0ATOTAL DO PEDIDO: ${total.toLocaleString(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            }
        )}`;

    const numero =
        '5598985207171';

    window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        '_blank'
    );

}

function limparCarrinho() {

    const confirmar =
        confirm(
            'Deseja realmente limpar o carrinho?'
        );

    if(!confirmar){
        return;
    }

    localStorage.removeItem(
        'carrinho'
    );

    carregarCarrinho();

    atualizarContadorCarrinho();

}

document.addEventListener(
    'DOMContentLoaded',
    () => {

        carregarCarrinho();

        atualizarContadorCarrinho();

        document
            .getElementById(
                'btnFinalizar'
            )
            .addEventListener(
                'click',
                finalizarPedido
            );

        document
            .getElementById(
                'btnLimparCarrinho'
            )
            .addEventListener(
                'click',
                limparCarrinho
            );

    }
);
