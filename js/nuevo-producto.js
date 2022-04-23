const imagen = 'https://placeimg.com/300/300/tech';

class Producto {
    static contadorProductos = 0;

    constructor(imagen, nombre, precio, descripcion){
        this._idProducto = ++Producto.contadorProductos;
        this._imagen = imagen,
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
    }

    get idProducto(){
        return this._idProducto;
    }

    get imagen(){
        return this._imagen;
    }

    set imagen(imagen){
        this._imagen = imagen;
    }

    get nombre(){
        return this._nombre;
    }

    set nombre(nombre){
        this._nombre = nombre;
    }

    get precio(){
        return this._precio;
    }

    set precio(precio){
        this._precio = precio;
    }

    get descripcion(){
        return this._descripcion;
    }

    set descripcion(descripcion){
        this._descripcion = descripcion;
    }

    toString(){
        return `idProducto: ${this._idProducto}, nombre: ${this._nombre}, precio: ${this._precio}, descripcion: ${this._descripcion}`
    }

}

let producto1 = new Producto('https://placeimg.com/300/300/tech', 'Consola Nintendo', 300, 'consola de nintendo reparada');

let producto2 = new Producto('https://loremflickr.com/300/300', 'Comando PlayStation 5', 1300, 'comando consola de PlayStation 5 usada');

console.log(producto1.toString());
console.log(producto2.toString());
