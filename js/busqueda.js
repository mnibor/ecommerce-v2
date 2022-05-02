const busqueda = document.querySelector('.formulario__input-busqueda');

busqueda.addEventListener('keyup', (event) => {
    event.preventDefault();

    if (busqueda.length !== 0) {
        document.querySelector('.header__banner').classList.add('ocultar');
    } else {
        document.querySelector('.header__banner').classList.remove('ocultar');
        document.querySelector('.header__banner').classList.add('mostrar');
    }

    
});