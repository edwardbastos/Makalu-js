document.addEventListener("DOMContentLoaded", function() {

    const botonAgregar  = document.querySelectorAll('.boton-carrito');
    const botonMas      = document.querySelectorAll('#boton-mas')
    const botonMenos    = document.querySelectorAll('#boton-menos')
    const botonVaciar   = document.querySelector('#vaciar-carrito');
    const itemsCarrito  = document.querySelector('#items');
    const footerCarrito = document.querySelector('#footer-carrito');

    let carrito = [];


    function agregarAlCarrito(event) {

        const boton = event.target;
        const producto = boton.parentElement;
        const id = producto.getAttribute('data-id');
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.getAttribute('data-precio');
        const cantidadDisponible = parseInt(producto.getAttribute('data-unidades'));
        const cantidadSeleccionada = 1;
     
        let itemExistente = carrito.find(item => item.id === id);

        
        if (itemExistente) {
            if (itemExistente.cantidad < cantidadDisponible) {
                itemExistente.cantidad++;
            } else {
                swal({
                    title: "Cantidad máxima alcanzada",
                    text: `Lo sentimos, no puedes seleccionar más de ${cantidadDisponible} unidades de ${nombre}`,
                    icon: "warning",
                    button: "Aceptar",
                  });
            }
        } else {
            const item = {
                id,
                nombre,
                precio,
                unidades: cantidadDisponible,
                cantidad: cantidadSeleccionada
            };
            carrito.push(item);
        }
    
        actualizarCarrito();
    }

    function aumentarCantidad(index) {
        const cantidadDisponible = carrito[index].unidades;
      
        if (carrito[index].cantidad >= cantidadDisponible) {
          alert(`No puede seleccionar más de ${cantidadDisponible} unidades para este producto.`);
          return;
        }
      
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

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
    } 

    function actualizarCarrito() {

        itemsCarrito.innerHTML = '';
    
        carrito.forEach((item, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-index', index); // agregamos el atributo data-index
            row.innerHTML = `
            <th scope="row" width="50">${index + 1}</th>
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
    
            <th scope="row" colspan="1">Total productos</th>
            <td style="width: 20%;">${cantidadTotal}</td>
            <td style="width: 60%;" class="font-weight-bold">$ <span>${precioTotal}</span></td>
            <td style="width: 20%;">
                <button class="boton" id="vaciar-carrito" onclick="vaciarCarrito()">
                    vaciar todo
                </button>
            </td>
        `;

        footerCarrito.innerHTML = '';
        footerCarrito.appendChild(row);
    }

    botonAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
    });

    botonMas.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.getAttribute('data-index');
            aumentarCantidad(index);
        });
    });
    
    botonMenos.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const index = event.target.parentElement.parentElement.getAttribute('data-index');
            disminuirCantidad(index);
        });
    });

    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }
    
    window.aumentarCantidad = aumentarCantidad;
    window.disminuirCantidad = disminuirCantidad;
    window.vaciarCarrito  = vaciarCarrito;

});

