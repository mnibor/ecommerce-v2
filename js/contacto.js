import { clientServices } from './services.js';

const nombre = document.querySelector('[data-form-nombre]');
const spanNombre = document.getElementById('span-nombre');

const mensaje = document.querySelector('[data-form-mensaje]');
const spanMensaje = document.getElementById('span-mensaje');

const mensajeSuccess = document.getElementById('mensaje-success');
const btnMensaje = document.querySelector('[data-form-btn-mensaje]');

const formulario = document.querySelector('.form');

const campos = {
    nombreMsj: false,
    mensajeMsj: false
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    validarFormulario();
    if (campos.nombreMsj && campos.mensajeMsj) {
        clientServices.crearMensaje(nombre.value, mensaje.value).then(respuesta => {
            //Mensaje enviado satisfactoriamente: habría que ver adonde lo redirecciono
            //window.location.href = '[alguna direccion html]';
            console.log(respuesta);
        }).catch((error) => alert('Ocurrió un error al enviar el mensaje'));
    } else {
        
    }
});

function validarFormulario() {
    validarNombre(nombre.value);
    validarMensaje(mensaje.value);
};

nombre.addEventListener('blur', function(event){
    let nombreMinusculas = nombre.value.toLowerCase();
    let arregloNombre = nombreMinusculas.replace(/\b[a-z]/g,c=>c.toUpperCase());
    nombre.innerHTML = arregloNombre;
    nombre.value = arregloNombre;

    if(nombre.value.length < 8 || nombre.value.length > 25) {
        errorNombre();
    } else {
        validarNombre(nombre.value);
    }
});

mensaje.addEventListener('blur', function(event){
    if (mensaje.value.length < 10 || mensaje.value.length > 200) {
        errorMensaje();
    } else {
        existeMensaje();
    }
});

function validarNombre (nombre) {
    let patronNombre = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    let compNombre = patronNombre.test(nombre);

    if(compNombre == false){
        errorNombre();
        campos.nombreMsj = false;
    } else {
        existeNombre();
        campos.nombreMsj = true;
    }
}

function validarMensaje (mensaje) {
    let patronMensaje = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    let compMensaje = patronMensaje.test(mensaje);

    if(compMensaje == false){
        errorMensaje();
        campos.mensajeMsj = false;
    } else {
        existeNombre();
        campos.mensajeMsj = true;
    }
}

function errorNombre() {
    nombre.classList.remove('formulario__input-valid');
    nombre.classList.add('formulario__input-invalid');
    spanNombre.classList.add('span-nombre-invalid');
    spanNombre.innerHTML = 'Debe incluir entre 8 y 25 caracteres';
}

function existeNombre(){
    nombre.classList.remove('formulario__input-invalid');
    nombre.classList.add('formulario__input-valid');
    spanNombre.classList.remove('span-nombre-invalid');
    spanNombre.classList.add('span-mensaje');
}

function errorMensaje () {
    mensaje.classList.remove('formulario__textarea-valid');
    mensaje.classList.add('formulario__textarea-invalid');
    spanMensaje.classList.add('span-mensaje-invalid');
    spanMensaje.innerHTML = 'Debe incluir entre 10 y 200 caracteres';
}

function existeMensaje () {
    mensaje.classList.remove('formulario__textarea-invalid');
    mensaje.classList.add('formulario__textarea-valid');
    spanMensaje.classList.remove('span-mensaje-invalid');
    spanMensaje.classList.add('span-mensaje');
}

function limpiarFormulario() {
    nombre.value = '';
    mensaje.value = '';
    nombre.classList.remove('formulario__input-valid');

    mensaje.classList.remove('formulario__textarea-valid');
    mensajeSuccess.classList.remove('mensaje-satisfactorio-valid');
}


