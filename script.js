const header = document.getElementById("main");

// Marca / logo
const brand = document.createElement("div");
brand.className = "brand";
brand.innerHTML = `<div class="brand-logo">INV</div><h1>Sistema Inventario</h1>`;

//navegacion
// const nav = document.createElement("nav");
// const links = [
//   {text:"Inventario", href:"#inventario"},
//   {text:"Categorias", href:"#categorias"},
// ];
// links.forEach(l=>{
//   const a = document.createElement("a");
//   a.textContent = l.text;
//   a.href = l.href;
//   nav.appendChild(a);
// });

//buscar rapido
const search = document.createElement("div");
search.className = "search";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Buscar producto...";
search.appendChild(searchInput);

header.appendChild(brand);
// header.appendChild(nav); no me gusta
header.appendChild(search);

//TERMINA EL HEADER

//COMIENZA BODY
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

function renderInventario(filtro = "") {
  inventario.innerHTML = "";
  productos
    .filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = 
        `<span>
          <strong>${p.nombre}</strong> | 
          Categoría: ${p.categoria} | 
          Cantidad: ${p.cantidad} | 
          Precio: $${p.precio.toFixed(2)}
        </span>`;

      // Botones
      const acciones = document.createElement("div");
      acciones.className = "acciones";

      const btnModificar = document.createElement("button");
      btnModificar.textContent = "Modificar";
      btnModificar.className = "modificar";
      btnModificar.addEventListener("click", () => modificarProducto(i));

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "eliminar";
      btnEliminar.addEventListener("click", () => eliminarProducto(i));

      acciones.appendChild(btnModificar);
      acciones.appendChild(btnEliminar);
      div.appendChild(acciones);

      inventario.appendChild(div);
    });
}

// Evento del formulario
formulario.addEventListener("submit", (eventosubmit) => {
  eventosubmit.preventDefault();

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

  //no duplique (nombre y categoria)
  const existe = productos.some(producto => 
    producto.nombre.toLowerCase() === nuevoProducto.nombre.toLowerCase() &&
    producto.categoria.toLowerCase() === nuevoProducto.categoria.toLowerCase()
  );

  if (existe) {
    mensaje.textContent = `El producto "${nuevoProducto.nombre}" ya existe en la categoría "${nuevoProducto.categoria}".`;
    return;
  }

  productos.push(nuevoProducto);
  guardarLocal();
  renderInventario();
  formulario.reset();
  mensaje.textContent = `Producto "${nuevoProducto.nombre}" agregado correctamente.`;
});

// alerta modificar (sweetalert)
function modificarProducto(index) {
  const actual = productos[index];

  Swal.fire({
    title: `Modificar "${actual.nombre}"`,
    html: `
      <input id="swal-cantidad" class="swal2-input" type="number" min="1" value="${actual.cantidad}" placeholder="Nueva cantidad">
      <input id="swal-precio" class="swal2-input" type="number" min="0" step="0.01" value="${actual.precio}" placeholder="Nuevo precio">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nuevaCantidad = parseInt(document.getElementById("swal-cantidad").value);
      const nuevoPrecio = parseFloat(document.getElementById("swal-precio").value);

      if (isNaN(nuevaCantidad) || nuevaCantidad <= 0 || isNaN(nuevoPrecio) || nuevoPrecio < 0) {
        Swal.showValidationMessage("Ingrese un valor valido para la cantidad y el precio: ");
        return false;
      }
      return { nuevaCantidad, nuevoPrecio };
    }
  }).then(result => {
    if (result.isConfirmed) {
      actual.cantidad = result.value.nuevaCantidad;
      actual.precio = result.value.nuevoPrecio;
      guardarLocal();
      renderInventario();
      Swal.fire("Actualizado", `Producto "${actual.nombre}" actualizado.`, "success");
    }
  });
}

// alerta en eliminar (sweetalert)
function eliminarProducto(index) {
  const nombre = productos[index].nombre;

  Swal.fire({
    title: `¿Eliminar "${nombre}"?`,
    text: "¿Serguro que quieres eliminar el producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(index, 1);
      guardarLocal();
      renderInventario();
      Swal.fire("Eliminado", `Producto "${nombre}" eliminado.`, "success");
    }
  });
}

//buscador
searchInput.addEventListener("input", (e) => {
  renderInventario(e.target.value);
});

renderInventario();