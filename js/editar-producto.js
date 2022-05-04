const table = document.querySelector('.tabla-productos');
const formulario = document.querySelector('#dragToUploadForm');

const detalleProducto = (id) => fetch(`http://localhost:3000/productos/${id}`).then(respuesta => respuesta.json());

const obtenerInformacion = async() => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if(id=== null) {
        // window.location.href = 'error.html';
    };

    const imagen = document.querySelector('#imagenProducto');
    const categoria = document.querySelector('#categoria');
    const nombre = document.querySelector('#nombreProducto');
    const precio = document.querySelector('#precioProducto');
    const descripcion = document.querySelector('#descripcionProducto');

    try {
        const prod = await detalleProducto(id);
        
        if (prod.imagen && prod.categoria && prod.nombre && prod.precio && prod.descripcion) {
            imagen.value = prod.imagen;
            categoria.value = prod.categoria;
            nombre.value = prod.nombre;
            precio.value = prod.precio;
            descripcion.value = prod.descripcion;
        } else {
            throw new Error();
        }
        
    } catch (error) {
        console.log('Hubo un error - ', error);
        // window.location.href = 'error.html';
    }
};
obtenerInformacion();

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    const imagenFinal = document.querySelector('#imagenProducto').value;
    const categoriaFinal = document.querySelector('#categoria').value;
    const nombreFinal = document.querySelector('#nombreProducto').value;
    const precioFinal = document.querySelector('#precioProducto').value;
    const descripcionFinal = document.querySelector('#descripcionProducto').value;

    actualizarProducto(id, imagenFinal, categoriaFinal, nombreFinal, precioFinal, descripcionFinal).then(() => {
        window.location.href = 'productos-todos.html';
    });
});

const actualizarProducto = (id, imagen, categoria, nombre, precio, descripcion) => fetch(`http://localhost:3000/productos/${id}`, {
    method: 'PUT',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({imagen, categoria, nombre, precio, descripcion})
}).then(respuesta => respuesta).catch((error) => console.log(error));