const email = document.querySelector('[data-form-correo]');
const password = document.querySelector('[data-form-password]');
const btn = document.querySelector('[data-form-btn-login]');

const spanEmail = document.getElementById('span-email');
const spanPassword = document.getElementById('span-password');

email.addEventListener('blur', function(event){
    event.preventDefault();
    // validarEmail(email.value);
});

password.addEventListener('blur', function(event){
    event.preventDefault();

    console.log(password.value);

    if (password.value.length < 8 || password.value.length > 16) {
        spanPassword.innerHTML = 'La contraseña debe tener entre 8 y 16 caracteres lorem 10';
        spanPassword.classList.add('span-password-invalid');
    } else {
        
    }

    // validarPassword(password.value);
});



function validarEmail(email) {
    var expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if(!expresion.test(email)){
        // mostrara un mensaje de que debe ingresar un correo electronico válido
        
        spanEmail.innerHTML = 'Correo electrónico incorrecto';
        spanEmail.classList.add('span-email-invalid');
        email.classList.add('formulario__input-invalid');
        cambiarBordeError('email');
        return false;
    } else {
        email.classList.add('formulario__input-valid');
        spanEmail.classList.remove('span-email-invalid');
    }
}

function validarPassword(password) {

    console.log(password);

    var expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    if (password.lenght < 8 || password.lenght > 16) {
        spanPassword.innerHTML = 'La contraseña debe tener entre 8 y 16 caracteres. No admite que se ingresen números. Debe incluir al menos una mayúscula';
        spanPassword.classList.add('span-password-invalid');
    } else {
        spanPassword.innerHTML = '';
        spanPassword.classList.remove('span-password-invalid');
    }

    if(!expresion.test(password)){
        password.classList.add('formulario__input-invalid');
        return false;
    } else {
        password.classList.add('formulario__input-valid');
        cambiarBordeSuccess('password');
    }
}

btn.addEventListener('click', function(event){ 
    event.preventDefault();

    if (email.value === null || email.value === '') {
        return false;
    } else {
        validarEmail(email.value);
    }

    if (password.value === null || password.value === '') {
        return false;
    } else {
        validarPassword(password.value);
    }

    mensajeSuccess.classList.add('mensaje-satisfactorio-valid');
    setTimeout(function(){
        limpiarFormulario();
        }, 5000);

});

function limpiarFormulario() {
    email.value = '';
    password.value = '';
    email.classList.remove('formulario__input-valid');
    password.classList.remove('formulario__input-valid');
    mensajeSuccess.classList.remove('mensaje-satisfactorio-valid');
}


// FUNCION PARA CAMBIAR EL COLOR DEL BORDE DEL CAMPO
// function cambiarBordeError(dato){
//     $('.' + dato).css({
//         border: "2px solid #FF0000"
//     });
// }

// function cambiarBordeSuccess(dato){
//     $('.' + dato).css({
//         border: "2px solid #008000"
//     });
// }

