import { usuariosServices } from "./services-usuarios.js";


// USUARIOS REGISTRADOS
const crearNuevaLinea = (id, email, password) => {
    const linea = document.createElement('tr');

    const contenido = `
        <td class="tabla__usuarios-items">${email}</td>
        <td class="tabla__usuarios-items">${password}</td>
        <td class="tabla__usuarios-items">
            <span>
                <a class="tabla__usuarios-link editar" href="editar-mensaje.html?id=${id}"><i class="tabla__usuarios-iconos edicion fas fa-pencil-alt"></i></a>
                <button class="tabla__usuarios-link eliminar" href="#" id="${id}"><i class="tabla__usuarios-iconos eliminar fas fa-trash-alt"></i></button>
            </span>
        </td>
    `;
    linea.innerHTML = contenido;
    const btn = linea.querySelector('.eliminar');
    btn.addEventListener('click', () => {
        const id = btn.id;
        usuariosServices.eliminarUsuario(id).then( respuesta => {
            // console.log(respuesta);
        }).catch((error) => alert('Hubo un error al eliminar el usuario'));
    });

    // const btn2 = linea.querySelector('.editar');
    // btn2.addEventListener('click', () => {
    //     const id = btn.id;
    //     console.log('EL CLICK EDITAR' + id);
    // });

    return linea;
};

const table = document.querySelector('[data-table');

usuariosServices.listaUsuarios().then((data) => {
    data.forEach(({id, email, password}) => {
        const nuevaLinea = crearNuevaLinea(id, email, password);
        table.appendChild(nuevaLinea);
    });
}).catch((error) => alert('Ocurrió un error en la Conexión'));


