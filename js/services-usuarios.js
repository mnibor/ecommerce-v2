//Obtengo todos los mensajes de la BD usuarios
const listaUsuarios = () => fetch('http://localhost:3000/usuarios').then(respuesta => respuesta.json());

const eliminarUsuario = (id) => fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE'
});

const crearUsuario = (email, password) => fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({id: uuid.v4(), email, password})
});

// const eliminarMensaje = (id) => fetch(`http://localhost:3000/mensajes/${id}`, {
//     method: 'DELETE'
// });

// const detalleMensaje = (id) => fetch(`http://localhost:3000/mensajes/${id}`).then(respuesta => respuesta.json());

// const actualizarMensaje = (id, nombre, mensaje) => fetch(`http://localhost:3000/mensajes/${id}`, {
//     method: 'PUT',
//     headers: {
//         "Content-type": "application/json"
//     },
//     body: JSON.stringify({nombre, mensaje})
// }).then(respuesta => respuesta).catch((error) => console.log(error));

export const usuariosServices = {
    listaUsuarios,
    eliminarUsuario,
    crearUsuario,
    // crearMensaje,
    // detalleMensaje,
    // actualizarMensaje,
};

