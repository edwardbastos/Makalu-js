document.addEventListener("DOMContentLoaded", function() {

    const botonAgregar  = document.querySelectorAll('.boton-carrito');
    const botonMas      = document.querySelector('.boton-mas')
    const botonMenos    = document.querySelector('.boton-menos')
    const itemsCarrito  = document.querySelector('#items');
    const footerCarrito = document.querySelector('#footer-carrito');

    let carrito = [];


    function agregarAlCarrito(event) {

        const boton = event.target;
        const producto = boton.parentElement;
        const id = producto.getAttribute('data-id');
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.getAttribute('data-precio');
        const cantidad = 1;
     
        let itemExistente = carrito.find(item => item.id === id);
        
        if (itemExistente) {
           itemExistente.cantidad++;
        } else {
           const item = {
              id,
              nombre,
              precio,
              cantidad
           };
           carrito.push(item);
        }
     
        actualizarCarrito();
    }

    function aumentarCantidad(index) {

        carrito[index].cantidad++;
        actualizarCarrito();
    }
      
    function disminuirCantidad(index) {
        
        if (carrito[index].cantidad > 1) {
          carrito[index].cantidad--;
        } else {
          carrito.splice(index, 1);
        }
        actualizarCarrito();
    }
      

    function actualizarCarrito() {

        itemsCarrito.innerHTML = '';

        carrito.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>
                <button class="boton"  id="boton-mas"    onclick="aumentarCantidad(${index})">+</button>
                <button class="boton"  id="boton-menos"  onclick="disminuirCantidad(${index})">-</button>
            </td>
            <td>$${item.precio}</td>
            `;
            itemsCarrito.appendChild(row);
        });

        actualizarFooter();

    }


    function actualizarFooter() {

        const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const precioTotal = carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

        if (carrito.length === 0) {
            footerCarrito.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `;
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row" colspan="2">Total productos</th>
            <td>${cantidadTotal}</td>
            <td>
            <button class="boton" id="vaciar-carrito">
                vaciar todo
            </button>
            </td>
            <td class="font-weight-bold">$ <span>${precioTotal}</span></td>
        `;
        footerCarrito.innerHTML = '';
        footerCarrito.appendChild(row);
    }

    botonAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
    });

    botonMas.forEach(boton => {
    boton.addEventListener('click', aumentarCantidad);
    }); 

    botonMenos.forEach(boton => {
    boton.addEventListener('click', disminuirCantidad);
    });    

});

