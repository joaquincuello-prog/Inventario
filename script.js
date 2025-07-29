const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const cantidad = document.getElementById("cantidad");
const precio = document.getElementById("precio");
const inventario = document.getElementById("inventario");
const mensaje = document.getElementById("mensaje");

let productos = JSON.parse(localStorage.getItem("inventario")) || [];

function guardarLocal() {
  localStorage.setItem("inventario", JSON.stringify(productos));
}

function renderInventario() {
  inventario.innerHTML = "";
  productos.forEach((p, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>
        <strong>${p.nombre}</strong> | Categoría: ${p.categoria} | Cantidad: ${p.cantidad} | Precio: $${p.precio.toFixed(2)}
      </span>
      <div>
        <button class="modificar" onclick="modificarProducto(${i})">Modificar</button>
        <button class="eliminar" onclick="eliminarProducto(${i})">Eliminar</button>
      </div>
    `;
    inventario.appendChild(div);
  });
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoProducto = {
    nombre: nombre.value.trim(),
    categoria: categoria.value.trim(),
    cantidad: parseInt(cantidad.value),
    precio: parseFloat(precio.value),
  };

  if (!nuevoProducto.nombre || !nuevoProducto.categoria || isNaN(nuevoProducto.cantidad) || isNaN(nuevoProducto.precio)) {
    mensaje.textContent = "Por favor complete todos los campos correctamente.";
    return;
  }

  productos.push(nuevoProducto);
  guardarLocal();
  renderInventario();
  formulario.reset();
  mensaje.textContent = `Producto "${nuevoProducto.nombre}" agregado correctamente.`;
});

window.modificarProducto = function(index) {
  const actual = productos[index];
  const nuevaCantidad = parseInt(prompt(`Cantidad actual: ${actual.cantidad}\nIngrese nueva cantidad:`));
  const nuevoPrecio = parseFloat(prompt(`Precio actual: $${actual.precio}\nIngrese nuevo precio:`));

  if (!isNaN(nuevaCantidad) && nuevaCantidad > 0 && !isNaN(nuevoPrecio) && nuevoPrecio >= 0) {
    actual.cantidad = nuevaCantidad;
    actual.precio = nuevoPrecio;
    guardarLocal();
    renderInventario();
    mensaje.textContent = `Producto "${actual.nombre}" actualizado.`;
  } else {
    mensaje.textContent = "Datos inválidos.";
  }
};

window.eliminarProducto = function(index) {
  const nombre = productos[index].nombre;
  if (confirm(`¿Seguro que desea eliminar "${nombre}"?`)) {
    productos.splice(index, 1);
    guardarLocal();
    renderInventario();
    mensaje.textContent = `Producto "${nombre}" eliminado.`;
  }
};

renderInventario();