//VARIABLES
const btnCarro = document(".carro-btn"); //Boton del carro (lo despliega)
const btnCerrarCarro = document(".cerrar-carro"); //Boton para cerrar el carro
const btnLimpiarCarro = document(".limpiar-carro"); //boton para limpiar todos los items del carro
const objetosCarro = document(".carro"); //objetos dentro del carro
const ventanaCarro = document(".carro-superpuesto"); //Ventana principal del carro
const contenedorCarro = document(".contenedor-carro"); //contenedor de los objetos agregados al carro
const itemCarro = document(".carro-item"); //Items del carro
const totalCarro = document(".carro-total"); //SPAN + H3 con el valor final de los objetos agregados al carro
const productosCentrarDOM = document(".productos-centrar"); //contenedor para cada uno de los productos
let carro = []; //objetos agregados al carro de compras

//Obteniendo productos
class productos {}

//Mostrando productos
class interfaz {}

//Local storage
class storage {}

//Cuando se cargue todo el DOM...ARRANCAMOS! :D
$(document).ready(() => {
  console.log("Hola desde JQUERY ;)");
  const stg = new storage();
  const productos = new productos();
});
