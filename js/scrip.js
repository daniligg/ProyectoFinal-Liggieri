// let opcion = parseInt(prompt('Elegir un producto \n1-JABÓN DE ALMENDRA $ 1500 .\n2-JABÓN DE COCO, NARANJA Y ROMERO $1700 .\n3-JABÓN DE CHOCOLATE Y ALMENDRA $ 1600. \n4-JABÓN DE VAINILLA $ 1800 \n0-Finalizar compra.'));
// let seleccionarCantidad;
// let total = 0;

// const cantidad = (cant, precio) => {
//     return cant * precio
// }

// while (opcion != 0) {
//     switch (opcion) {
//         case 1:
//             seleccionarCantidad = parseInt(prompt('el producto seleccionado es JABÓN DE ALMENDRA, indique la cantidad'))
//             total += cantidad(seleccionarCantidad, 1500)
//             break;
//         case 2:
//             seleccionarCantidad = parseInt(prompt('el producto seleccionado es JABÓN DE COCO, NARANJA Y ROMERO, indique la cantidad'))
//             total += cantidad(seleccionarCantidad, 1700)
//             break;
//         case 3:
//             seleccionarCantidad = parseInt(prompt('el producto seleccionado es JABÓN DE CHOCOLATE Y ALMENDRA, indique la cantidad'))
//             total += cantidad(seleccionarCantidad, 1600)
//             break;
//         case 4:
//             seleccionarCantidad = parseInt(prompt('el producto seleccionado es JABÓN DE VAINILLA , indique la cantidad'))
//             total += cantidad(seleccionarCantidad, 1800)
//             break;

//         default:
//             break;
//     }
//     opcion = parseInt(prompt('\n1-JABÓN DE ALMENDRA $ 1500 .\n2-JABÓN DE COCO, NARANJA Y ROMERO $1700 .\n3-JABÓN DE CHOCOLATE Y ALMENDRA $ 1600. \n4-JABÓN DE VAINILLA $ 1800 \n0-Finalizar compra.'));
// }
// alert('el total de la compra es de: ' + total);

// alert('Gracias por su compra');


// //Hasta áca es la primer entrega//
// //segunda entrega//

// class Producto {
//     constructor(nombre, precio, cantidad) {
//         this.nombre = nombre.toUpperCase();
//         this.precio = parseFloat(precio);
//         this.cantidad = cantidad;
//     }
// }

// const listaDeCompras = [
//     new Producto("JABÓN DE ALMENDRA", 1500, 1),
//     new Producto("JABÓN DE COCO, NARANJA Y ROMERO", 1700, 2),
//     new Producto("JABÓN DE CHOCOLATE Y ALMENDRA", 1600, 5),
//     new Producto("JABÓN DE VAINILLA", 1800, 1)
// ];

// console.log(listaDeCompras);


// let continuar = true;

// while (continuar) {
//     let ingreso = prompt('Ingresa los datos del producto: nombre, precio, cantidad, separados por una barra diagonal ("\\"). Ingresa X para finalizar');
//     if (ingreso.toUpperCase() == 'X') {
//         continuar = false;
//         break;
//     }

//     let datos = ingreso.split('\\');
//     const Compras = new Producto(datos[0], datos[1], datos[2]);

//     listaDeCompras.push(Compras);

//     console.log(listaDeCompras);
// }

// let eleccion = prompt('Elegí la opción deseada:\n1 - Precio de mayor a menor \n2 - Precio de menor a mayor');

// function ordenar(eleccion, array) {
//     let arrayOrdenado = array.slice(0);


//     switch (eleccion) {
//         case '1':
//             return arrayOrdenado.sort((a, b) => b.precio - a.precio);
//         case '2':
//             return arrayOrdenado.sort((a, b) => a.precio - b.precio);
//         default:
//             alert('No es una opción válido');
//             break;
//     }
// }


// function crearStringResultado(array) {
//     let info = '';

//     array.forEach(elemento => {
//         info += '\nnombre: ' + elemento.nombre + '\n$: ' + elemento.precio + '\ncantidad: ' + elemento.cantidad;
//     })

//     return info;

// }
// alert(crearStringResultado(ordenar(eleccion, listaDeCompras)))




// const MisCompras = [{
//     nombre: "JABÓN DE ALMENDRA",
//     precio: 1500,
//     cantidad: 2,
//     total: function () {
//         return this.precio * this.cantidad;
//     }
// }];

// alert(MisCompras[0].total());


//Hasta aca la segunda entrega//
//aca empieza la tercer entrega//


const shopContent = document.getElementById("shopContent"),
  verCarrito = document.getElementById("verCarrito"),
  modalContainer = document.getElementById("modal-container"),
  cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const traerProductos = async () => {
  const response = await fetch("./js/data.json");
  const data = await response.json();
  console.log(data);

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3>${product.nombre}</h3>
      <p class="price"> $ ${product.precio} </p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
            Toastify({

              text: "Se ha agregado tu producto",

              duration: 2000

            }).showToast();

          }
        });
      } else {
        carrito.push({
          id: product.id,
          img: product.img,
          nombre: product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });

        carritoContar();
        guardarLocal();
      }
    });
  });


}
traerProductos();


const guardarLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const dibujarCarrito = () => {
  modalContainer.innerHTML = " ";
  modalContainer.style.display = "flex";
  const modal = document.createElement("div");
  modal.className = "modal-header";
  modal.innerHTML = `
      <h1 class="modal-header-title">Carrito de Compras</h1>
    `;
  modalContainer.append(modal);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modal.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p> $ ${product.precio} </p>
        <span class="restar"> - </span>
        <p>Cantidad: ${product.cantidad} </p>
        <span class="sumar"> + </span>
        <p>Total: $ ${product.cantidad * product.precio} </p>
        <span class="delete-product"> 🗑 </span>
      `;


    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      guardarLocal();
      dibujarCarrito();
      Toastify({

        text: "Se ha eliminado tu producto",

        duration: 2000

      }).showToast();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      guardarLocal();
      dibujarCarrito();
      Toastify({

        text: "Se ha agregado tu producto",

        duration: 2000

      }).showToast();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
      Toastify({

        text: "Se ha eliminado tu producto",

        duration: 2000

      }).showToast();
    });

  });

  const total = carrito.reduce((a, el) => a + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: $ ${total}`;
  modalContainer.append(totalBuying);

  const finalizarCompra = document.createElement("button");
  finalizarCompra.className = "finalizar-compra";
  finalizarCompra.innerHTML = `Finalizar compra`;
  modalContainer.append(finalizarCompra);

  finalizarCompra.addEventListener("click", () => {
    modalContainer.style.display = "none";
    Swal.fire(
      'Su compra se realizo con éxito!',
      'Gracias por su compra!',

    );
    vaciarCarrito();
    localStorage.clear();

    function vaciarCarrito() {
      carrito = [];

    }

  });

};

verCarrito.addEventListener("click", dibujarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoContar();
  guardarLocal();
  dibujarCarrito();
};

const carritoContar = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

};

carritoContar();;