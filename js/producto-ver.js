const url = new URL(window.location);
const id = url.searchParams.get("id");

const detalleProducto = (id) => {
    return fetch(`http://localhost:3000/productos?id=${id}`)
        .then(response => response.json())
        .then(json => mostrarProducto(json))
        .catch((error) => console.log(error));
};

detalleProducto(id);

const categoria = document.querySelector(".producto-detalle__container-categoria");
const titulo = document.querySelector(".producto-detalle__container-titulo");
const precio = document.querySelector('.producto-detalle__container-precio');
const descripcion = document.querySelector('.producto-detalle__container-descripcion');

const mostrarProducto = (data) => {
    const image = document.createElement('img');
    image.classList.add('producto-detalle__container-img');
    image.src  = `${data[0].imagen}`;
    document.querySelector('.producto-detalle__container-imagen').appendChild(image);

    categoria.innerHTML = data[0].categoria;
    titulo.innerHTML = data[0].nombre;
    precio.innerHTML = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'ARS' }).format(data[0].precio);
    descripcion.innerHTML = data[0].descripcion;
}

// Aca cargo la parte inferior de la página (seis productos aleatorios)
const todosProductos = () => {
    return fetch(`http://localhost:3000/productos?id_ne=${id}`) 
        .then(response => response.json())
        .then(json => productos(json))
        .catch((error) => console.log(error));
};

const productos = data => {

    // Obtengo los productos aleatorios
    let cantidadNumeros = data.length - 1;
    let arrayAleatorio = [];
    let productosAleatorios = [];

    while(arrayAleatorio.length < 6 ){
        let numeroAleatorio = Math.ceil(Math.random()*cantidadNumeros);
        let existe = false;

        for(let i=0; i < arrayAleatorio.length; i++){
            if(arrayAleatorio [i] == numeroAleatorio){
                existe = true;
                break;
            } 
        }

        if(!existe){
            arrayAleatorio[arrayAleatorio.length] = numeroAleatorio;
            productosAleatorios.push(data[numeroAleatorio]);
        }
    }
    // console.log("números aleatorios : " + arrayAleatorio);
    mostrarProductosRelacionados(productosAleatorios);
}
todosProductos();

const insertar = document.querySelector('.starswars__container-productos');

const mostrarProductosRelacionados = (dataAleatoria) => {
    let body = '';
    dataAleatoria.forEach((dataAleatoria) => {
        const nuevaLinea = crearTarjeta(dataAleatoria.id, dataAleatoria.imagen, dataAleatoria.categoria, dataAleatoria.nombre, dataAleatoria.precio);
        insertar.appendChild(nuevaLinea);
    })
};

const crearTarjeta = (id, imagen, categoria, nombre, precio) => {
    const nuevaTarjeta = document.createElement('article');
    nuevaTarjeta.classList.add('cardProducto');

    const contenido = `
            <div class="cardProducto__imagen">
                <a href="producto_detalle.html?id=${id}"><img class="cardProducto__imagen-img" src="${imagen}" alt="producto"></a>
            </div>
            <div class="cardProducto__texto">
                <small class="cardProducto__categoria">${categoria}</small>
                <div class="cardProducto__titulo">
                    <p>${nombre}</p>   
                </div>
                <div class="cardProducto__precio">
                    <p>$ ${precio}</p> 
                </div>
                <a class="cardProducto__link" href="producto_detalle.html?id=${id}">Ver Producto</a>
            </div>`;
    nuevaTarjeta.innerHTML = contenido;
    return nuevaTarjeta;
};