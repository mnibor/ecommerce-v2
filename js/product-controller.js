import { productServices } from "./product-services.js";

// TODOS LOS PRODUCTOS

const table = document.querySelector('.tabla-productos');
const formulario = document.querySelector('#dragToUploadForm');

const crearNuevaLinea = (id, categoria, nombre, precio) => {
    const linea = document.createElement('tr');

    const contenido = `
        <td class="tabla__mensajes-items">${categoria}</td>
        <td class="tabla__mensajes-items">${nombre}</td>
        <td class="tabla__mensajes-items">${precio}</td>
        <td class="tabla__mensajes-items">
            <div class="acciones">
                <a class="btnEditar" href="editar-producto.html?id=${id}"><i class="fas fa-edit tabla__mensajes-iconos "></i></a>
                <a class="btnBorrar" href="#" id="${id}"><i class="fas fa-cart-plus tabla__mensajes-iconos "></i></a>
            </div>
        </td>
    `;
    linea.innerHTML = contenido;
    const btn = linea.querySelector('.btnBorrar');
    btn.addEventListener('click', () => {
        const id = btn.id;
        productServices.eliminarProducto(id).then( respuesta => {
            console.log(respuesta);
        }).catch((error) => alert('Hubo un error al eliminar el producto'));
    });

    const btn2 = linea.querySelector('.btnEditar');
    btn2.addEventListener('click', () => {
        const id = btn.id;
        console.log('EL CLICK EDITAR' + id);
    });

    return linea;
};

productServices.listaProductos().then((data) => {
    data.forEach(({id, categoria, nombre, precio}) => {
        const nuevaLinea = crearNuevaLinea(id, categoria, nombre, precio);
        table.appendChild(nuevaLinea);
    });
}).catch((error) => alert('Ocurrió un error en la Conexión'));