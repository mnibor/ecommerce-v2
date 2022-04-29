const crearProducto = () => {

}

const eliminarProducto = () => {
    
}

const detalleProducto = (id) => fetch(`http://localhost:3000/productos?id=${id}`)
        .then(response => response.json())
        .then(json => mostrarDatos(json))
        .catch((error) => console.log(error));



const mostrarDatos = (data) => {
    console.log(data);
}

const actualizarProducto = () => {
    
}




export const productServices = {
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};
