//Obtengo todos los mensajes de la BD
const listaMensajes = () => fetch('http://localhost:3000/mensajes').then(respuesta => respuesta.json());

const crearMensaje = (nombre, mensaje) => fetch('http://localhost:3000/mensajes', {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({id: uuid.v4(), nombre, mensaje})
});

const eliminarMensaje = (id) => fetch(`http://localhost:3000/mensajes/${id}`, {
    method: 'DELETE'
});

const detalleMensaje = (id) => fetch(`http://localhost:3000/mensajes/${id}`).then(respuesta => respuesta.json());

const actualizarMensaje = (id, nombre, mensaje) => fetch(`http://localhost:3000/mensajes/${id}`, {
    method: 'PUT',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({nombre, mensaje})
}).then(respuesta => respuesta).catch((error) => console.log(error));

export const clientServices = {
    listaMensajes,
    crearMensaje,
    eliminarMensaje,
    detalleMensaje,
    actualizarMensaje,
};

