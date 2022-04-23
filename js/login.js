const email = document.querySelector('[data-form-correo]');
const password = document.querySelector('[data-form-password]');
const btn = document.querySelector('[data-form-btn-login]');

const spanEmail = document.getElementById('span-email');
const spanPassword = document.getElementById('span-password');

email.addEventListener('blur', function(event){
    event.preventDefault();
    if(validarEmail(email.value) == true) {
        successEmail();
    } else {
        errorEmail();
    };
});

function validarEmail(email) {
    var expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(!expresion.test(email)){
        return false;
    } else {
        return true;
    }
}

function errorEmail(){
    email.classList.add('formulario__input-invalid');
    spanEmail.innerHTML = 'Email incorrecto. Vuelva a intentar de ingresar un correo electrónico válido';
    spanEmail.classList.add('span-email-invalid');
}

function successEmail() {
    email.classList.remove('formulario__input-invalid');
    email.classList.add('formulario__input-valid');
    spanEmail.classList.remove('span-email-invalid');
}

password.addEventListener('blur', function(event){
    event.preventDefault();
    if (password.value.length < 8 || password.value.length > 16) {
        errorPassword();
    } else {
        if(validarPassword(password.value) == true) {
            successPassword();
        } else {
            errorPassword();
        };
    }
});

function validarPassword(password) {
    var expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if(!expresion.test(password)){
        return false;
    } else {
        return true;
    }
}

function errorPassword(){
    password.classList.add('formulario__input-invalid');
    spanPassword.innerHTML = 'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos';
    spanPassword.classList.add('span-password-invalid');
}

function successPassword() {
    password.classList.remove('formulario__input-invalid');
    password.classList.add('formulario__input-valid');
    spanPassword.classList.remove('span-password-invalid');
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
        email.value = '';
        email.classList.remove('formulario__input-valid');

        password.value = '';
        password.classList.remove('formulario__input-valid');
        mensajeSuccess.classList.remove('mensaje-satisfactorio-valid');
    }, 5000);
});



