let uri = 'http://localhost:3000/productos?categoria=Diversos';

fetch(uri)
    .then(response => response.json())
    .then(json => mostrarDatos(json))
    .catch(error => console.log(error));

const insertar = document.querySelector('.diversos__container-productos');

const mostrarDatos = (data) => {
    let body = '';
    data.forEach((data) => {
        const nuevaLinea = crearTarjeta(data.id, data.imagen, data.categoria, data.nombre, data.precio);
        insertar.appendChild(nuevaLinea);
    })
};

const crearTarjeta = (id, imagen, categoria, nombre, precio) => {
    const nuevaTarjeta = document.createElement('article');
    nuevaTarjeta.classList.add('cardProducto');

    const contenido = `
            <div class="cardProducto__imagen">
                <a href="producto_detalle.html"><img class="cardProducto__imagen-img" src="${imagen}" alt="producto"></a>
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
}

