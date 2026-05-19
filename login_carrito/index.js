let productos = [];

    function iniciarSesion() {
      const usuario = document.getElementById("usuario").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorLogin = document.getElementById("errorLogin");

      if (usuario === "admin" && password === "1234") {
        document.getElementById("login").classList.add("oculto");
        document.getElementById("carrito").classList.remove("oculto");
        document.getElementById("nombreUsuario").textContent = usuario;
        errorLogin.textContent = "";
      } else {
        errorLogin.textContent = "Usuario o contraseña incorrectos";
      }
    }

    function cerrarSesion() {
      document.getElementById("login").classList.remove("oculto");
      document.getElementById("carrito").classList.add("oculto");
      document.getElementById("usuario").value = "";
      document.getElementById("password").value = "";
    }

    function agregarProducto() {
      const nombre = document.getElementById("nombreProducto").value.trim();
      const precio = parseFloat(document.getElementById("precioProducto").value);
      const mensaje = document.getElementById("mensajeCarrito");

      mensaje.textContent = "";

      if (nombre === "" || isNaN(precio) || precio <= 0) {
        mensaje.textContent = "Complete correctamente el producto y el precio";
        return;
      }

      const productoExistente = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        if (productos.length >= 5) {
          mensaje.textContent = "Solo puede agregar hasta 5 productos distintos";
          return;
        }

        productos.push({
          nombre: nombre,
          precio: precio,
          cantidad: 1
        });
      }

      document.getElementById("nombreProducto").value = "";
      document.getElementById("precioProducto").value = "";

      mostrarCarrito();
    }

    function aumentarCantidad(index) {
      productos[index].cantidad++;
      mostrarCarrito();
    }

    function restarCantidad(index) {
      if (productos[index].cantidad > 1) {
        productos[index].cantidad--;
      } else {
        productos.splice(index, 1);
      }

      mostrarCarrito();
    }

    function eliminarProducto(index) {
      productos.splice(index, 1);
      mostrarCarrito();
    }

    function mostrarCarrito() {
      const tabla = document.getElementById("tablaCarrito");
      const totalCarrito = document.getElementById("totalCarrito");

      tabla.innerHTML = "";
      let total = 0;

      if (productos.length === 0) {
        tabla.innerHTML = `
          <tr>
            <td colspan="5">No hay productos cargados</td>
          </tr>
        `;
        totalCarrito.textContent = "0";
        return;
      }

      productos.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        tabla.innerHTML += `
          <tr>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
              <button class="btn-cantidad" onclick="restarCantidad(${index})">-</button>
              ${producto.cantidad}
              <button class="btn-cantidad" onclick="aumentarCantidad(${index})">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
              <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
          </tr>
        `;
      });

      totalCarrito.textContent = total.toFixed(2);
    }