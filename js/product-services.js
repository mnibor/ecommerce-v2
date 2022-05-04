//Obtengo todos los productos de la BD ordenados por categoria
const listaProductos = () => fetch('http://localhost:3000/productos?_sort=categoria').then(respuesta => respuesta.json());

const eliminarProducto = (id) => fetch(`http://localhost:3000/productos/${id}`, {
    method: 'DELETE'
});

export const productServices = {
    listaProductos,
    eliminarProducto,
};