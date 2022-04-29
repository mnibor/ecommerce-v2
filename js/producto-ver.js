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

    console.log(image.src );

    document.querySelector('.producto-detalle__container-imagen').appendChild(image);

    categoria.innerHTML = data[0].categoria;
    titulo.innerHTML = data[0].nombre;
    precio.innerHTML = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'ARS' }).format(data[0].precio);
    descripcion.innerHTML = data[0].descripcion;
}
