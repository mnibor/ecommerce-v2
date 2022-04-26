const crearNuevaLinea = (nombre, mensaje) => {
    const linea = document.createElement('tr');

    const contenido = `
        <td class="tabla__mensajes-items">id</td>
        <td class="tabla__mensajes-items">${nombre}</td>
        <td class="tabla__mensajes-items">${mensaje}</td>
        <td class="tabla__mensajes-items">
            <span>
                <a class="tabla__mensajes-link" href="#"><i class="tabla__mensajes-iconos edicion fas fa-pencil-alt"></i></a>
                <a class="tabla__mensajes-link" href="#"><i class="tabla__mensajes-iconos eliminar fas fa-trash-alt"></i></a>
            </span>
        </td>
    `;
    linea.innerHTML = contenido;
    return linea;
};

const table = document.querySelector('[data-table');


const http = new XMLHttpRequest;

http.open('GET', 'http://localhost:3000/mensajes');

http.send();

http.onload = () => {
    const data = JSON.parse(http.response);
    data.forEach(msj => {
        const nuevaLinea = crearNuevaLinea(msj.nombre, msj.mensaje);
        table.appendChild(nuevaLinea);
    });
}
