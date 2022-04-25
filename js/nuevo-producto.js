const dropArea = document.querySelector('.drop-area');
const dropText = document.querySelector('.drop-area__titulo');
const btnImagen = document.querySelector('.drop-area__btn');
const inputImagen = document.querySelector('#input-file');
let files;


dragToUploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (files) {
    e.submit();
  }
});

btnImagen.addEventListener("click", (e) => {
  inputImagen.click(); //if user click on the button then the input also clicked
});

inputImagen.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  files = this.files[0];
  dropArea.classList.add("active");
  showFile(files); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dropText.textContent = "Suelta para subir la imagen";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dropText.textContent = "Arrastra y suelta la imagen";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  files = event.dataTransfer.files;
  showFile(files); //calling function
  dropArea.classList.remove("active");
  dropText.textContent = "Arrastra y suelta la imagen";
});

function showFile(files) {
  [...files].forEach((file) => {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) {
      //if user selected file is an image file
      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.onload = () => {
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
        const image = document.createElement("img");
        image.src = fileURL;
        image.setAttribute("width", "50px");
        let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
        //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        document.querySelector("#preview").appendChild(image);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("Está intentando subir un archivo que no es válido");
      dropArea.classList.remove("active");
      dropText.textContent = "Arrastra y suelta la imagen";
    }
  });
}


// El resto del formulario

const nombreProducto = document.querySelector('#nombreProducto');
const precioProducto = document.querySelector('#precioProducto');
const descripcionProducto = document.querySelector('#descripcionProducto');

const spanNombreProducto = document.querySelector('.span-nombre-producto');
const spanPrecioProducto = document.querySelector('.span-precio-producto');
const spanDescripcionProducto = document.querySelector('.span-descripcion-producto'); 

const btnEnviar = document.querySelector('.formulario__boton');




btnEnviar.addEventListener('click', function(event){
	event.preventDefault();

	console.log(nombreProducto.value);

	if (nombreProducto.value === '' || nombreProducto.value === null) {

		nombreProducto.classList.add('formulario__input-invalid');
		spanNombreProducto.classList.add('span-nombre-producto-invalid');
		spanNombreProducto.innerHTML = 'El nombre del producto no puede ser nulo (al menos 10 caracteres)';

	} else {

	}


});

nombreProducto.addEventListener('blur', function(){
	//cuando pierde el foco analizo si el campo esta vacío 

	if (nombreProducto.value === '' || nombreProducto.value === null) {

		nombreProducto.classList.add('formulario__input-invalid');
		spanNombreProducto.classList.add('span-nombre-producto-invalid');
		spanNombreProducto.innerHTML = 'El nombre del producto no puede ser nulo (al menos 10 caracteres)';

	} else {

	}


	


});

precioProducto.addEventListener('blur', function(){

	if (precioProducto.value === '' || precioProducto.value === null) {

		precioProducto.classList.add('formulario__input-invalid');
		spanPrecioProducto.classList.add('span-precio-producto-invalid');
		spanPrecioProducto.innerHTML = 'El precio del producto no puede ser nulo';

	} else {

	}



});


spanDescripcionProducto.addEventListener('blur', function(){

	if (descripcionProducto.value === '' || descripcionProducto.value === null) {

		descripcionProducto.classList.add('formulario__input-invalid');
		spanDescripcionProducto.classList.add('span-descripcion-producto-producto-invalid');
		spanDescripcionProducto.innerHTML = 'Debe agregar una descripción del producto';

	} else {

	}

});
























// class Producto {
//     static contadorProductos = 0;

//     constructor(imagen, nombre, precio, descripcion){
//         this._idProducto = ++Producto.contadorProductos;
//         this._imagen = imagen,
//         this._nombre = nombre;
//         this._precio = precio;
//         this._descripcion = descripcion;
//     }

//     get idProducto(){
//         return this._idProducto;
//     }

//     get imagen(){
//         return this._imagen;
//     }

//     set imagen(imagen){
//         this._imagen = imagen;
//     }

//     get nombre(){
//         return this._nombre;
//     }

//     set nombre(nombre){
//         this._nombre = nombre;
//     }

//     get precio(){
//         return this._precio;
//     }

//     set precio(precio){
//         this._precio = precio;
//     }

//     get descripcion(){
//         return this._descripcion;
//     }

//     set descripcion(descripcion){
//         this._descripcion = descripcion;
//     }

//     toString(){
//         return `idProducto: ${this._idProducto}, nombre: ${this._nombre}, precio: ${this._precio}, descripcion: ${this._descripcion}`
//     }

// }

// let producto1 = new Producto('https://placeimg.com/300/300/tech', 'Consola Nintendo', 300, 'consola de nintendo reparada');

// let producto2 = new Producto('https://loremflickr.com/300/300', 'Comando PlayStation 5', 1300, 'comando consola de PlayStation 5 usada');

// console.log(producto1.toString());
// console.log(producto2.toString());
