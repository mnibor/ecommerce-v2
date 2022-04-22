const nombre = document.querySelector('[data-form-nombre]');
const spanNombre = document.getElementById('span-nombre');

const mensaje = document.querySelector('[data-form-mensaje]');
const spanMensaje = document.getElementById('span-mensaje');

const mensajeSuccess = document.getElementById('mensaje-success');
const btnMensaje = document.querySelector('[data-form-btn-mensaje]');


btnMensaje.addEventListener('click', function(event){

    event.preventDefault();

    if (nombre.value === '' && mensaje.value === '') {
        nombre.classList.add('formulario__input-invalid');
        spanNombre.classList.add('span-nombre-invalid');
        spanNombre.innerHTML = 'No puede ser nulo (Al menos 8 caracteres)';

        mensaje.classList.add('formulario__textarea-invalid');
        spanMensaje.classList.add('span-mensaje-invalid');
        spanMensaje.innerHTML = 'Debe escribir un mensaje';
        return false;
    } 

    if (nombre.value === null || nombre.value === '') {
        nombre.classList.add('formulario__input-invalid');
        spanNombre.classList.add('span-nombre-invalid');
        spanNombre.innerHTML = 'No yyyyyyyyyyyyyyyyyyyyyyyyaracteres)';
        return false;
    }

    if (mensaje.value === null || mensaje.value === '') {
        mensaje.classList.add('formulario__textarea-invalid');
        spanMensaje.classList.add('span-mensaje-invalid');
        spanMensaje.innerHTML = 'Debe escribir un mensaje';
        return false;
    }

    mensajeSuccess.classList.add('mensaje-satisfactorio-valid');
    setTimeout(function(){
        limpiarFormulario();
        }, 5000);

});

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
    } else {
        existeNombre();
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


