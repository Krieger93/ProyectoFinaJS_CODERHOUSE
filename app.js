//VARIABLES
const btnCarro = $(".carro-btn"); //Boton del carro (lo despliega)
const btnCerrarCarro = $(".cerrar-carro"); //Boton para cerrar el carro
const btnLimpiarCarro = $(".limpiar-carro"); //boton para limpiar todos los items del carro
const objetosCarro = $(".carro"); //objetos dentro del carro
const ventanaCarro = $(".carro-superpuesto"); //Ventana principal del carro
const contenedorCarro = $(".contenedor-carro"); //contenedor de los objetos agregados al carro
const itemCarro = $(".carro-item"); //Items del carro
const totalCarro = $(".carro-total"); //SPAN + H3 con el valor final de los objetos agregados al carro
const productosCentrarDOM = $(".productos-centrar"); //contenedor para cada uno de los productos
let carro = []; //objetos agregados al carro de compras

//Obteniendo productos
class productos {
  async obtenerProductos() {
    try {
      let resultado = await fetch("informacion.json");
      let datos = await resultado.json();
      let datosProductos = datos.items;
    } catch (error) {}
  }
}

//Mostrando productos
class interfaz {}

//Local storage
class storage {}

$(document).ready(() => {
  const stg = new storage();
  const Productos = new productos();
  //Obtener todos los productos
  Productos.obtenerProductos().then((data) => console.log(data));
});
