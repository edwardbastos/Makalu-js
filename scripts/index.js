const printers = [
  {id:1, nombre: "HP Laserjet Pro M521dn", precio: 2150, unidades: 9},
  {id:2, nombre: "Kyocera FS M3655idn"   , precio: 1800, unidades: 7},
  {id:3, nombre: "Lexmark XM3150"        , precio: 2300, unidades:11},
];

console.log("Productos disponibles:");
for (let i = 0; i < printers.length; i++) {
  console.log(printers[i].id + ". " + printers[i].nombre + " ($ " + printers[i].precio + " USD) " + "Unidades: " + printers[i].unidades);
}

const carrito = [];

while (true) {
  const seleccion = prompt("Ingrese el id del producto que desea agregar al carrito (o escriba 'terminar' para finalizar):");
  if (seleccion.toLowerCase() === "terminar") {
    break;
  }
  const producto = printers.find(function(p) {
    return p.id === parseInt(seleccion);
  });
  if (producto) {
    if (producto.unidades > 0) {
      carrito.push(producto);
      producto.unidades--;
      console.log("\nProducto agregado al carrito: " + producto.nombre);
    } else {
      console.log("Lo sentimos, no hay unidades disponibles para este producto.");
    }
  } else {
    console.log("ID de producto no válido.");
  }
}

let total = 0;
console.log("\nProductos en el carrito:");
for (let i = 0; i < carrito.length; i++) {
  console.log(carrito[i].nombre + " ($ " + carrito[i].precio + " USD)");
  total += carrito[i].precio;
}

console.log("\n\nTotal de la compra: $" + total + " USD");
