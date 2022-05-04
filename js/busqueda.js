const busqueda = document.querySelector('.formulario__input-busqueda');
const btnBusqueda = document.querySelector('.boton__busqueda');
const tituloBusqueda = document.querySelector('#starswars');
const tituloConsolas = document.querySelector('#tituloConsolas');
const tituloDiversos = document.querySelector('#tituloDiversos');

const celdas = document.getElementsByTagName('td');

let uri = 'http://localhost:3000/productos';

fetch(uri)
    .then(response => response.json())
    .then(json => mostrarDatos(json))
    .catch(error => console.log(error));

const mostrarDatos = (data) => {

    console.log(data);
    
    let body = '';
    data.forEach(data => {
        body += `<tr><td>${data.nombre}</td></tr>`;
    });
    document.querySelector('.starswars__container-productos').innerHTML = body;
};

btnBusqueda.addEventListener('click', (event) => {
    event.preventDefault();

    if (busqueda.value !== '') {
        document.querySelector('.header__banner').classList.remove('mostrar');
        document.querySelector('.header__banner').classList.add('ocultar');
        tituloBusqueda.innerHTML = 'Resultado de la Búsqueda:';
        tituloConsolas.classList.remove('mostrar-titulo');
        tituloConsolas.classList.add('ocultar-titulo');

    } else {
        document.querySelector('.header__banner').classList.remove('ocultar');
        document.querySelector('.header__banner').classList.add('mostrar');
        tituloBusqueda.innerHTML = 'Stars Wars';

        tituloConsolas.classList.remove('ocultar-titulo');
        tituloConsolas.classList.add('mostrar-titulo');
    };

    

    let texto = event.target.value;
    console.log(texto);
    let er = new RegExp(texto, 'i');

    console.log(er);

    for (let index = 0; index < celdas.length; index++) {
        let valor = celdas[index];
        if(er.test(valor.innerText)) {
            valor.classList.remove('ocultar');
        } else {
            valor.classList.add('ocultar');
        }
        
    }

    
});