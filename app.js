//VARIABLES
let carro = []; //Productos agregados al carro de compras
let botonesDOM = []; //Botones de productos

//Obteniendo productos
class productos {
  async obtenerProductos() {
    try {
      let resultado = await fetch("informacion.json");
      let datos = await resultado.json();
      let datosProductos = datos.items;
      return datosProductos;
    } catch (error) {}
  }
}

//Mostrando productos
class interfaz {
  mostrarProductos(Productos) {
    let incorporar = "";
    Productos.forEach((Productos) => {
      incorporar += `
      <article class="productos">
      <div class="img-container">
        <img
          src=${Productos.imagen}
          alt="Producto"
          class="product-img"
        />
        <button class="boton-Acarro" data-id=${Productos.id}>
          <i class="fas fa-shopping-cart">Agregar al carro</i>
        </button>
      </div>
      <h3>${Productos.titulo}</h3>
      <h4>$${Productos.precio}</h4>
    </article>
    `;
    });
    $(".productos-centrar").html(incorporar);
  }
  traerBotones() {
    const botones = [...$(".boton-Acarro")];
    botonesDOM = botones;
    botones.forEach((boton) => {
      let id = boton.dataset.id;
      let inCarro = carro.find((item) => item.id === id);
      if (inCarro) {
        boton.innerText = "Item agregado";
        $(boton).prop("disabled", true);
      }
      boton.addEventListener("click", (evento) => {
        evento.target.innerText = "Item agregado";
        $(boton).prop("disabled", true);
        //traer los productos
        let itemsCarro = { ...storage.traerProductos(id), cantidad: 1 };
        //Agregarlos al carro
        carro = [...carro, itemsCarro];
        //Guardar carro en Local Storage
        storage.guardarCarro(carro);
        //Codeando el valor del carro...
        this.setValorCarro(carro);
        //Agregar los productos seleccionados a la visualización del carro
        this.addItemsCarro(itemsCarro);
        //mostrar el carro
        this.mostrarCarro();
      });
    });
  }
  setValorCarro(carro) {
    let tempTotal = 0;
    let itemsTotal = 0;
    carro.map((item) => {
      tempTotal += item.precio * item.cantidad;
      itemsTotal += item.cantidad;
    });
    $(".carro-total").html(parseFloat(tempTotal.toFixed(2)));
    $(".carro-objetos").html(itemsTotal);
  }
  addItemsCarro(item) {
    let incorporar = `
    <img src=${item.imagen} alt="Producto" />
            <div>
              <h4>${item.titulo}</h4>
              <h5>$${item.precio}</h5>
              <span class="eliminar-item" data-id=${item.id}>Eliminar</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id=${item.id}></i>
              <p class="cantidad-producto">${item.cantidad}</p>
              <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
  `;
    $(".item-carro").append(incorporar);
  }
  mostrarCarro() {
    $(".carro-superpuesto").addClass("fondoTransparente");
    $(".carro").addClass("mostrarCarro");
  }

  setupAPP() {
    carro = storage.obtenerCarro();
    this.setValorCarro(carro);
    this.llenarCarro(carro);
    $(".carro-btn").click(this.mostrarCarro);
    $(".cerrar-carro").click(this.cerrarCarro);
  }
  llenarCarro(carro) {
    carro.forEach((item) => this.addItemsCarro(item));
  }
  cerrarCarro() {
    $(".carro-superpuesto").removeClass("fondoTransparente");
    $(".carro").removeClass("mostrarCarro");
  }

  logicaCarro() {
    $(".limpiar-carro").click(() => this.limpiarCarro());
    $(".contenedor-carro").click((evento) => {
      if (evento.target.classList.contains("eliminar-item")) {
        let eliminarObjeto = evento.target;
        let id = eliminarObjeto.dataset.id;
        this.eliminarItem(id);
        location.reload();
      } else if (evento.target.classList.contains("fa-chevron-up")) {
        let agregarUno = evento.target;
        let id = agregarUno.dataset.id;
        let tempItem = carro.find((item) => item.id === id);
        tempItem.cantidad = tempItem.cantidad + 1;
        storage.guardarCarro(carro);
        this.setValorCarro(carro);
        agregarUno.nextElementSibling.innerText = tempItem.cantidad;
      } else if (evento.target.classList.contains("fa-chevron-down")) {
        let quitarUno = evento.target;
        let id = quitarUno.dataset.id;
        let tempItem = carro.find((item) => item.id === id);
        tempItem.cantidad = tempItem.cantidad - 1;
        if (tempItem.cantidad < 1) {
          alert("no puede tener un valor de 0 items");
        } else {
          storage.guardarCarro(carro);
          this.setValorCarro(carro);
          quitarUno.previousElementSibling.innerText = tempItem.cantidad;
        }
      }
    });
  }
  limpiarCarro() {
    let itemsCarro = carro.map((item) => item.id);
    itemsCarro.forEach((id) => this.eliminarItem(id));
    while ($(".contenedor-carro").children().length > 0) {
      $(".contenedor-carro").children().remove();
    }
    location.reload();
  }
  eliminarItem(id) {
    carro = carro.filter((item) => item.id !== id);
    this.setValorCarro(carro);
    storage.guardarCarro(carro);
    let boton = this.traerbotonesInd(id);
    $(boton).prop("disabled", false);
    boton.innerHTML = `<i class="fas fa-shopping-cart"></i>Agregar al carro`;
  }
  traerbotonesInd(id) {
    return botonesDOM.find((boton) => boton.dataset.id === id);
  }
}

//Local storage
class storage {
  static guardaProductos(Productos) {
    localStorage.setItem("productos", JSON.stringify(Productos));
  }
  static traerProductos(id) {
    let productos = JSON.parse(localStorage.getItem("productos"));
    return productos.find((producto) => producto.id === id);
  }

  static guardarCarro(carro) {
    localStorage.setItem("carro", JSON.stringify(carro));
  }
  static obtenerCarro() {
    return localStorage.getItem("carro")
      ? JSON.parse(localStorage.getItem("carro"))
      : [];
  }
}

$(document).ready(() => {
  const Interfaz = new interfaz();
  const Productos = new productos();
  Interfaz.setupAPP();
  //Obtener todos los productos
  Productos.obtenerProductos()
    .then((Productos) => {
      Interfaz.mostrarProductos(Productos);
      storage.guardaProductos(Productos);
    })
    .then(() => {
      Interfaz.traerBotones();
      Interfaz.logicaCarro();
    });
});
