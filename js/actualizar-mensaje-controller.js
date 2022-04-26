import { clientServices } from './services.js';

const formulario = document.querySelector('.form')

const obtenerInformacion = () => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if(id=== null) {
        window.location.href = 'error.html';
    };

    const nombre = document.querySelector('[data-form-nombre]');
    const mensaje = document.querySelector('[data-form-mensaje]');

    clientServices.detalleMensaje(id).then( msj => {
        nombre.value = msj.nombre;
        mensaje.value = msj.mensaje;
    });
};
obtenerInformacion();

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    const nombre = document.querySelector('[data-form-nombre]').value;
    const mensaje = document.querySelector('[data-form-mensaje]').value;

    clientServices.actualizarMensaje(id, nombre, mensaje).then(() => {
        window.location.href = 'mensajes-recibidos.html';
    });
})