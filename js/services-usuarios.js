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

export const usuariosServices = {
    listaUsuarios,
    eliminarUsuario,
    crearUsuario,
};

