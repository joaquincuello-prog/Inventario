//alert()

const inventario = [];

//ingresar el producto
function agregarProductos (){
    let nombre = prompt("Ingrese el nombre del producto");
    let cantidad = parseInt(prompt("Ingrese la cantidad"));
    inventario.push({nombre, cantidad});
    alert(`Producto agregado:\n${nombre} - Cantidad: ${cantidad}`);
}

//inventario
function mostrarInventario(){
    console.log ("inventario actual:");
    inventario.forEach((item, index) =>{
        console.log (`${index + 1}. ${item.nombre} - cantidad: ${item.cantidad}`);
    });
}

//modificar el producto
function modificarProducto (){
    let nombreBuscar = prompt ("ingrese el nombre del producto a modificar");
    let encontrado = inventario.find(p => p.nombre  === nombreBuscar );

    if (encontrado) {
        let nuevaCantidad = parseInt(prompt(`Cantidad actual: ${encontrado.cantidad}\nIngrese nueva cantidad:`));
        encontrado.cantidad = nuevaCantidad;
        alert(`cantidad actualizada para ${nombreBuscar}: ${nuevaCantidad}`);
    } else {
        alert("producto no encontrado.");
    }

}
// eliminar el producto
function eliminarProducto(){
    let nombreEliminar = prompt("ingrese el nombre del producto a elminiar");
    let index = inventario.findIndex(p => p.nombre === nombreEliminar);

    if (index  !== -1){
        let confirmar= confirm('¿Estas seguro de que quieres eliminar el producto? "${nombreEliminar}"?')
        if (confirmar){
            inventario.splice(index, 1);
            alert('Producto eliminado: ${nombreEliminar}');
        }
    } else{
        alert('Producto no encontrado');
    }
}

// menu
function menusimulador(){
    let continuar = true;

    while (continuar){
        let opcion = prompt(
            "seleccione una opcion: \n"+
            "1. Agregar producto\n" +
            "2. Mostrar inventario\n" +
            "3. Modificar producto\n" +
            "4. Eliminar producto\n" +
            "5. Salir"

        );

        switch (opcion) {
            case "1":
                agregarProductos();
                break;
            case "2":
                mostrarInventario();
                break;
            case "3":
                modificarProducto();
                break;
            case "4":
                eliminarProducto();
                break;
            case "5":
                continuar = false;
                alert("Simulador finalizado. Gracias por usarlo.");
                break;
            default:
                alert("Opción inválida. Intente nuevamente.");
            }

        }
}

menusimulador();

//la ejecucion de las funciones
// agregarProductos();
// mostrarInventario();
// modificarProducto();
// mostrarInventario();