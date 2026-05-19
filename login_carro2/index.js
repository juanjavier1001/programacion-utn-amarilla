    let carrito = [];

    function login() {
      let usuario = document.getElementById("txtUsuario").value;
      let clave = document.getElementById("txtClave").value;
      let mensaje = document.getElementById("mensajeLogin");

      if (usuario === "usuario" && clave === "1111") {
        document.getElementById("seccionLogin").classList.add("ocultar");
        document.getElementById("seccionCarrito").classList.remove("ocultar");
        document.getElementById("usuarioActual").innerText = usuario;
        mensaje.innerText = "";
      } else {
        mensaje.innerText = "Datos incorrectos";
      }
    }

    function salir() {
      document.getElementById("seccionCarrito").classList.add("ocultar");
      document.getElementById("seccionLogin").classList.remove("ocultar");
      document.getElementById("txtUsuario").value = "";
      document.getElementById("txtClave").value = "";
    }

    function agregarAlCarrito() {
      let nombre = document.getElementById("txtProducto").value.trim();
      let precio = Number(document.getElementById("txtPrecio").value);
      let mensaje = document.getElementById("mensajeProducto");

      mensaje.innerText = "";

      if (nombre === "" || precio <= 0) {
        mensaje.innerText = "Ingrese un producto y un precio válido";
        return;
      }

      let encontrado = carrito.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());

      if (encontrado) {
        encontrado.cantidad++;
      } else {
        if (carrito.length === 5) {
          mensaje.innerText = "No se pueden agregar más de 5 productos";
          return;
        }

        carrito.push({
          nombre: nombre,
          precio: precio,
          cantidad: 1
        });
      }

      document.getElementById("txtProducto").value = "";
      document.getElementById("txtPrecio").value = "";

      mostrarCarrito();
    }

    function sumar(index) {
      carrito[index].cantidad++;
      mostrarCarrito();
    }

    function restar(index) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }

      mostrarCarrito();
    }

    function borrar(index) {
      carrito.splice(index, 1);
      mostrarCarrito();
    }

    function mostrarCarrito() {
      let tabla = document.getElementById("contenidoCarrito");
      let totalFinal = 0;

      tabla.innerHTML = "";

      if (carrito.length === 0) {
        tabla.innerHTML = `
          <tr>
            <td colspan="5">Todavía no hay productos</td>
          </tr>
        `;
        document.getElementById("total").innerText = "0";
        return;
      }

      carrito.forEach((item, index) => {
        let subtotal = item.precio * item.cantidad;
        totalFinal += subtotal;

        tabla.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
              <button class="btn-menos" onclick="restar(${index})">-</button>
              ${item.cantidad}
              <button class="btn-mas" onclick="sumar(${index})">+</button>
            </td>
            <td>$${subtotal}</td>
            <td>
              <button class="btn-borrar" onclick="borrar(${index})">X</button>
            </td>
          </tr>
        `;
      });

      document.getElementById("total").innerText = totalFinal;
    }