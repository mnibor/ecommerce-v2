import { productServices } from "./producto-editar-controller.js";

const obtenerProducto = async() => {
    const uri = new URL(window.location);
    const id = uri.searchParams.get('id');

    console.log(id);

    if(id=== null) {
        window.location.href = 'error.html';
    };

    // const nombre = document.querySelector('[data-form-nombre]');
    // const mensaje = document.querySelector('[data-form-mensaje]');

    // try {

    //     const msj = await clientServices.detalleMensaje(id);

    //     if (msj.nombre && msj.mensaje) {

    //         nombre.value = msj.nombre;
    //         mensaje.value = msj.mensaje;
            
    //     } else {
    //         throw new Error();
    //     }
        

    // } catch (error) {
    //     console.log('Hubo un error - ', error);
    //     window.location.href = 'error.html';
    // }

    
    
};
obtenerProducto();