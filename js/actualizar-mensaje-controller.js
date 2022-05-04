import { clientServices } from './services.js';

const formulario = document.querySelector('.form')

const obtenerInformacion = async() => {
    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if(id=== null) {
        window.location.href = 'error.html';
    };

    const nombre = document.querySelector('[data-form-nombre]');
    const mensaje = document.querySelector('[data-form-mensaje]');

    try {
        const msj = await clientServices.detalleMensaje(id);
        
        if (msj.nombre && msj.mensaje) {
            nombre.value = msj.nombre;
            mensaje.value = msj.mensaje;
        } else {
            throw new Error();
        }
        
    } catch (error) {
        console.log('Hubo un error - ', error);
        window.location.href = 'error.html';
    }
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