import { clientServices } from "./services.js";

// MENSAJES RECIBIDOS
const crearNuevaLinea = (id, nombre, mensaje) => {
    const linea = document.createElement('tr');

    const contenido = `
        <td class="tabla__mensajes-items">${nombre}</td>
        <td class="tabla__mensajes-items">${mensaje}</td>
        <td class="tabla__mensajes-items">
            <span>
                <a class="tabla__mensajes-link editar" href="editar-mensaje.html?id=${id}"><i class="tabla__mensajes-iconos edicion fas fa-pencil-alt"></i></a>
                <button class="tabla__mensajes-link eliminar" href="#" id="${id}"><i class="tabla__mensajes-iconos eliminar fas fa-trash-alt"></i></button>
            </span>
        </td>
    `;
    linea.innerHTML = contenido;
    const btn = linea.querySelector('.eliminar');
    btn.addEventListener('click', () => {
        const id = btn.id;
        clientServices.eliminarMensaje(id).then( respuesta => {
            console.log(respuesta);
        }).catch((error) => alert('Hubo un error al eliminar el mensaje'));
    });

    const btn2 = linea.querySelector('.editar');
    btn2.addEventListener('click', () => {
        const id = btn.id;
        console.log('EL CLICK EDITAR' + id);
    });

    return linea;
};

const table = document.querySelector('[data-table');

clientServices.listaMensajes().then((data) => {
    data.forEach(({id, nombre, mensaje}) => {
        const nuevaLinea = crearNuevaLinea(id, nombre, mensaje);
        table.appendChild(nuevaLinea);
    });
}).catch((error) => alert('Ocurrió un error en la Conexión'));
