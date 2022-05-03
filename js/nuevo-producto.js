const dropArea = document.querySelector('.drop-area');
const dropText = document.querySelector('.drop-area__titulo');
const btnImagen = document.querySelector('.drop-area__btn');
const inputImagen = document.querySelector('#input-file');
let files;

const campos = {
    imagenPr: false,
    categoriaPr: false,
    nombrePr: false,
    precioPr: false,
    descripcionPr: false
}

btnImagen.addEventListener('click', (event) => {
    //si el usuario hace clic en el botón, entonces la entrada también hizo clic
    inputImagen.click();
});

inputImagen.addEventListener('change', function () {
    //obtener el archivo de selección de usuario y [0] esto significa que si el usuario selecciona varios archivos, seleccionaremos solo el primero
    files = this.files[0];
    dropArea.classList.add('active');
    //llamamos a la función
    showFile(files);
});

//If user Drag File Over DropArea
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add('active');
    dropText.textContent = 'Suelta para subir la imagen';
});

//If user leave dragged File from DropArea
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('error');
    dropText.textContent = 'Arrastra y suelta una imagen';
    dropArea.classList.remove('active');
});

//If user drop File on DropArea
dropArea.addEventListener('drop', (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    files = event.dataTransfer.files;
    showFile(files); //calling function
    dropArea.classList.remove('active');
});

function showFile(files) {

    //Obtenemos el tipo de archivo
    let fileType = files.type;

    // Agregamos las extensiones de las imagenes admitidas, en formato de array
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(fileType)) {

        //Si el usuario subió una imagen
        let fileReader = new FileReader();

        //creating new FileReader object
        fileReader.onload = () => {

            //passing user file source in fileURL variable
            let fileURL = fileReader.result;

            // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
            const image = document.createElement('img');
            image.src = fileURL;
            image.setAttribute('width', '50px');
            campos['imagenPr'] = true;

            //creating an img tag and passing user selected file source inside src attribute
            let imgTag = `<img src='${fileURL}' alt='image'>`;
            //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
            document.querySelector('#preview').appendChild(image);
        };

        fileReader.readAsDataURL(files);
    } else {

        alert('Está intentando subir un archivo que no es válido');
        dropArea.classList.remove('active');
        campos['imagenPr'] = false;
        // dropArea.classList.add('error');
        // dropText.textContent = 'Error: Arrastra y suelta una imagen';

    }
}

// El resto del formulario

const formulario = document.querySelector('.dragToUploadForm');

const categoriaProducto = document.querySelector('#categoria');

const nombreProducto = document.querySelector('#nombreProducto');
const precioProducto = document.querySelector('#precioProducto');
const descripcionProducto = document.querySelector('#descripcionProducto');

const spanNombreProducto = document.querySelector('.span-nombre-producto');
const spanPrecioProducto = document.querySelector('.span-precio-producto');
const spanDescripcionProducto = document.querySelector('.span-descripcion-producto');
const spanCategoriaProducto = document.querySelector('.span-categoria-producto');

const inputs = document.querySelectorAll('#dragToUploadForm input');

const expresionesRegulares = {
    nombreProd: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
    precioProd: /^[0-9]{1,5}[.,][0-9]{2}$/,
    descripcionProd: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ.,]+$/
};

const btnEnviar = document.querySelector('.formulario__boton');

dragToUploadForm.addEventListener('submit', (event) => {
    // Controlo el evento de apretar el boton submit
    event.preventDefault();

    validarFormulario();
    if (campos.imagenPr && campos.categoriaPr && campos.nombrePr && campos.precioPr && campos.descripcionPr) {
        //Si estan todos los campos llenos y validados, mando a enviar el formulario


        const crearProduc = (imagen, categoria, nombre, precio, descripcion) => fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({id: uuid.v4(), imagen, categoria, nombre, precio, descripcion})
        });

        let imagen = 'https://placehold.co/400x400';


        crearProduc(imagen,  categoriaProducto.value, nombreProducto.value, precioProducto.value, descripcionProducto.value);
        console.log(imagen);
        console.log(categoriaProducto.value);
        console.log(nombreProducto.value);
        console.log(precioProducto.value);
        console.log(descripcionProducto.value);

        


        // dragToUploadForm.reset();

        document.querySelector('.mensaje-satisfactorio').classList.remove('mensaje-satisfactorio-invalid');
        document.querySelector('.mensaje-satisfactorio').innerHTML = 'El producto se ha agregado correctamente';

        document.querySelector('.mensaje-satisfactorio').classList.add('mensaje-satisfactorio-valid');

        setTimeout(() => {
            document.querySelector('.mensaje-satisfactorio').classList.remove('mensaje-satisfactorio-valid');
            location.reload();
        }, 5000);
    } else {
        
        
        document.querySelector('.mensaje-satisfactorio').classList.add('mensaje-satisfactorio-invalid');
        document.querySelector('.mensaje-satisfactorio').innerHTML = 'Por favor, complete los campos correctamente';
    }

});

const validarFormulario = () => {

    // VALIDACION DEL CAMPO CATEGORIA
    if (categoriaProducto.value == 'Selecciona una opción...') {
        categoriaProducto.classList.add('formulario__select-invalid');
        spanCategoriaProducto.classList.add('span-categoria-producto-invalid');
        spanCategoriaProducto.innerHTML = 'Debe seleccionar un elemento de la lista desplegable';
        campos['categoriaPr'] = false;
    } else {
        categoriaProducto.classList.remove('formulario__select-invalid');
        categoriaProducto.classList.add('formulario__select-valid');
        spanCategoriaProducto.classList.remove('span-categoria-producto-invalid');
        campos['categoriaPr'] = true;
    }

    // VALIDACION DEL CAMPO NOMBRE DEL PRODUCTO
    if (nombreProducto.value != '') {
        // Si el nombre del producto no es nulo quiere decir que viene algo
        if (expresionesRegulares.nombreProd.test(nombreProducto.value)) {
            // Si el nombre del producto pasa la validacion, el nombre es valido
            nombreProducto.classList.remove('formulario__input-invalid');
            nombreProducto.classList.add('formulario__input-valid');
            spanNombreProducto.classList.remove('span-nombre-producto-invalid');
            campos['nombrePr'] = true;
        } else {
            validacionErronea(nombreProducto, 'El nombre del Producto no es valido');
            campos['nombrePr'] = false;
        }
    } else {
        validacionErronea(nombreProducto, 'El nombre del producto no puede ser nulo. Debe tener entre 8 y 25 caracteres');
        campos['nombrePr'] = false;
    }

    // VALIDACION DEL CAMPO PRECIO
    if (precioProducto.value != '') {
        // Si el nombre del producto no es nulo quiere decir que viene algo
        precioProducto.classList.remove('formulario__input-invalid');
        precioProducto.classList.add('formulario__input-valid');
        spanPrecioProducto.classList.remove('span-precio-producto-invalid');
        campos['precioPr'] = true;
    } else {
        validacionErronea(precioProducto, 'El precio del producto no puede ser nulo');
        campos['precioPr'] = false;
    }

    // VALIDACION DEL CAMPO DESCRIPCION
    if (descripcionProducto.value != '') {
        // Si la descripcion del producto no es nula es porque vino algo
        if (expresionesRegulares.descripcionProd.test(descripcionProducto.value)) {
            descripcionProducto.classList.remove('formulario__textarea-invalid');
            descripcionProducto.classList.add('formulario__textarea-valid');
            spanDescripcionProducto.classList.remove('span-descripcion-producto-invalid');
            campos['descripcionPr'] = true;
        } else {
            validacionErronea(descripcionProducto, 'La descripcion del producto no es valida');
            campos['descripcionPr'] = false;
        }
    } else {
        validacionErronea(descripcionProducto, 'La descripcion del producto es obligatoria');
        campos['descripcionPr'] = false;
    }
};


const validacionErronea = (campo, mensaje) => {
    switch (campo.name) {
        case 'nombreProducto':
            nombreProducto.classList.add('formulario__input-invalid');
            spanNombreProducto.classList.add('span-nombre-producto-invalid');
            spanNombreProducto.innerHTML = mensaje;
            break;

        case 'precioProducto':
            precioProducto.classList.add('formulario__input-invalid');
            spanPrecioProducto.classList.add('span-precio-producto-invalid');
            spanPrecioProducto.innerHTML = mensaje;
            break;

        case 'descripcionProducto':
            descripcionProducto.classList.add('formulario__textarea-invalid');
            spanDescripcionProducto.classList.add('span-descripcion-producto-invalid');
            spanDescripcionProducto.innerHTML = mensaje;
            break;
    
        default:
            break;
    }
}

    // switch (e.target.name) {
    //     case 'nombreProducto':
    //         if (expresionesRegulares.nombreProd.test(e.target.value)) {
    //             
    //         } else {
    //             nombreProducto.classList.add('formulario__input-invalid');
    //             spanNombreProducto.classList.add('span-nombre-producto-invalid');
    //             spanNombreProducto.innerHTML = 'El nombre del producto debe tener entre 8 y 25 caracteres';
    //             campos['nombrePr'] = false;
    //         }
            
    //         break;

    //     case 'precioProducto':
    //         if (expresionesRegulares.precioProd.test(e.target.value)) {
    //             precioProducto.classList.remove('formulario__input-invalid');
    //             precioProducto.classList.add('formulario__input-valid');
    //             spanPrecioProducto.classList.remove('span-precio-producto-invalid');
    //             campos['precioPr'] = true;
    //         } else {
    //             precioProducto.classList.add('formulario__input-invalid');
    //             spanPrecioProducto.classList.add('span-precio-producto-invalid');
    //             spanPrecioProducto.innerHTML = 'El precio solo lleva separador de decimales (un punto o una coma';
    //             campos['precioPr'] = false;
    //         }
        
    //         break;

    //     case 'input-file':

    //         break;
    
    //     default:
    //         break;
    // } 

    // descripcionProducto.addEventListener('keyup', (e) => {
    //     if (expresionesRegulares.descripcionProd.test(descripcionProducto.value)) {
    //         descripcionProducto.classList.remove('formuario__textarea-invalid');
    //         descripcionProducto.classList.add('formuario__textarea-valid');
    //         spanDescripcionProducto.classList.remove('span-descripcion-producto-invalid');
    //         campos['descripcionPr'] = true;
    //     } else {
    //         descripcionProducto.classList.add('formuario__textarea-invalid');
    //         spanDescripcionProducto.classList.add('span-descripcion-producto-invalid');
    //         spanDescripcionProducto.innerHTML = 'Debe incluir una descripcion del producto. Solo caracteres alfabéticos';
    //         campos['descripcionPr'] = false;
    //     }
    // });

    // descripcionProducto.addEventListener('blur', (e) => {
    //     if (expresionesRegulares.descripcionProd.test(descripcionProducto.value)) {
    //         descripcionProducto.classList.remove('formulario__textarea-invalid');
    //         descripcionProducto.classList.add('formulario__textarea-valid');
    //         spanDescripcionProducto.classList.remove('span-descripcion-producto-invalid');
    //         campos['descripcionPr'] = true;
    //     } else {
    //         descripcionProducto.classList.add('formulario__textarea-invalid');
    //         spanDescripcionProducto.classList.add('span-descripcion-producto-invalid');
    //         spanDescripcionProducto.innerHTML = 'Debe incluir una descripcion del producto. Solo caracteres alfabéticos';
    //         campos['descripcionPr'] = false;
    //     }
    // });



    
    // this.submit();









// btnEnviar.addEventListener('click', (event) => {
//     event.preventDefault();


// });




categoriaProducto.addEventListener('click', (event) => {
    if (categoriaProducto.value == 'Selecciona una opción...') {
        categoriaProducto.classList.add('formulario__select-invalid');
        spanCategoriaProducto.classList.add('span-categoria-producto-invalid');
        spanCategoriaProducto.innerHTML = 'Debe seleccionar un elemento de la lista desplegable';
    } else {
        categoriaProducto.classList.remove('formulario__select-invalid');
        categoriaProducto.classList.add('formulario__select-valid');
        spanCategoriaProducto.classList.remove('span-categoria-producto-invalid');
    }
})





// nombreProducto.addEventListener('blur', function() {
//   //cuando pierde el foco analizo si el campo esta vacío







// });

// precioProducto.addEventListener('blur', function() {

    



// });

// descripcionProducto.addEventListener('blur', function() {

    

// });

