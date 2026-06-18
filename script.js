const slides =
    document.querySelectorAll('.slide');

let indice = 0;

setInterval(() => {

    slides[indice]
        .classList.remove('ativo');

    indice++;

    if(indice >= slides.length){
        indice = 0;
    }

    slides[indice]
        .classList.add('ativo');

},3000);
