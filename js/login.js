import { usuariosServices } from './services-usuarios.js';

const email = document.querySelector('[data-form-correo]');
const password = document.querySelector('[data-form-password]');
const btn = document.querySelector('[data-form-btn-login]');

const spanEmail = document.getElementById('span-email');
const spanPassword = document.getElementById('span-password');

const formularioInput = document.querySelector('.form-login');

const campos = {
    emailUsr: false,
    passwordUsr: false
}

formularioInput.addEventListener('submit', (event) => {
    event.preventDefault();
    validarLogin();

    if(campos.emailUsr && campos.passwordUsr) {
        usuariosServices.crearUsuario(email.value, password.value).then(respuesta => {
            //Mensaje enviado satisfactoriamente: habría que ver adonde lo redirecciono
            //window.location.href = '[alguna direccion html]';
            // console.log(respuesta);
        }).catch((error) => alert('Ocurrió un error al enviar el mensaje'));
    } else {

    }
});

const validarLogin = () => {
    validarEmail(email);
    validarPassword(password);
}

function validarEmail(email) {
    let expresion = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let compEmail = expresion.test(email.value);

    if (compEmail == false) {
        errorEmail();
        campos.emailUsr = false;
    } else {
        successEmail();
        campos.emailUsr = true;
    }
}

function validarPassword(password) {
    var expresion = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    console.log(password.value, (password.value.length));

    if(expresion.test(password.value)){
        successPassword();
        campos.passwordUsr = true;
    } else {
        
        errorPassword();
        campos.passwordUsr = false;
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




// email.addEventListener('blur', function(event){
//     event.preventDefault();
//     if(validarEmail(email.value) == true) {
//         successEmail();
//     } else {
//         errorEmail();
//     };
// });





// password.addEventListener('blur', function(event){
//     event.preventDefault();
//     if (password.value.length < 8 || password.value.length > 16) {
//         errorPassword();
//     } else {
//         if(validarPassword(password.value) == true) {
//             successPassword();
//         } else {
//             errorPassword();
//         };
//     }
// });





// btn.addEventListener('click', function(event){ 
//     event.preventDefault();

//     if (email.value === null || email.value === '') {
//         return false;
//     } else {
//         validarEmail(email.value);
//     }

//     if (password.value === null || password.value === '') {
//         return false;
//     } else {
//         validarPassword(password.value);
//     }

//     mensajeSuccess.classList.add('mensaje-satisfactorio-valid');
//     setTimeout(function(){
//         email.value = '';
//         email.classList.remove('formulario__input-valid');

//         password.value = '';
//         password.classList.remove('formulario__input-valid');
//         mensajeSuccess.classList.remove('mensaje-satisfactorio-valid');
//     }, 5000);
// });



