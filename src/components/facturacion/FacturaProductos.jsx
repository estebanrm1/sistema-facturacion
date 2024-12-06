import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const FacturaProductos = ({ productos, productosFactura, eliminarProducto, agregarProducto }) => {
  const [cantidad, setCantidad] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("");

  // Calcular stock restante para cada producto
  const calcularStockRestante = (productoId) => {
    const productoEnFactura = productosFactura.find((p) => p.id === productoId);
    const cantidadEnFactura = productoEnFactura ? productoEnFactura.cantidad : 0;
    const productoOriginal = productos.find((p) => p.id === productoId);
    return productoOriginal ? productoOriginal.cantidad - cantidadEnFactura : 0;
  };

  const handleAgregarProducto = () => {
    if (!productoSeleccionado || cantidad <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar un producto y una cantidad válida.",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    const stockRestante = calcularStockRestante(productoSeleccionado.id);

    if (cantidad > stockRestante) {
      Swal.fire({
        icon: "error",
        title: "Stock insuficiente",
        text: `Solo quedan ${stockRestante} unidades disponibles de este producto.`,
        confirmButtonText: "Aceptar",
      });
      setCantidad("");
      return;
    }

    agregarProducto(productoSeleccionado, parseInt(cantidad, 10));

    // Resetear el formulario después de agregar el producto
    setCantidad("");
    setProductoSeleccionado(null);
    setFiltro("");
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h4>Agregar Producto</h4>
      <Form.Group controlId="formProducto">
      {/* <Form.Label>Buscar Producto</Form.Label>  */}
        <div className="container-input mb-2">
          <input required="required" className="inp"
          name="productoBuscado"
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          />
          <span className="content">Escribe el nombre del producto</span>
        </div>

        {/* <Form.Control
          className="w-50"
          type="text"
          placeholder="Escribe el nombre del producto"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        /> */}
        {filtro && (
          <ul className="list-group mt-2">
            {productosFiltrados.map((producto) => {
              const stockRestante = calcularStockRestante(producto.id);
              return (
                <li
                  key={producto.id}
                  className={`list-group-item d-flex w-50 align-items-center ${
                    stockRestante <= 0 ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (stockRestante > 0) {
                      setProductoSeleccionado(producto);
                      setFiltro(producto.nombre); // Muestra el nombre del producto seleccionado en el input
                    }
                  }}
                  style={{ cursor: stockRestante > 0 ? "pointer" : "not-allowed" }}
                >
                  {producto.nombre} - ${producto.precio} (Stock: {stockRestante})
                </li>
              );
            })}
            {productosFiltrados.length === 0 && (
              <li className="list-group-item text-muted">No se encontraron productos</li>
            )}
          </ul>
        )}
      </Form.Group>

      <Form.Group controlId="formCantidad">
        <div className="container-input">
          <input required="required" className="inp" 
          type="number"
          value={cantidad}
          onChange={(e) => {
            const valor = parseInt(e.target.value, 10);
            setCantidad(valor >= 0 ? valor : "");
          }}
          min="0"
          max={productoSeleccionado ? calcularStockRestante(productoSeleccionado.id) : ""}
          />
          <span className="content">Cantidad</span>
        </div>
      </Form.Group>
      <button className="bton my-3 btn-azul" onClick={handleAgregarProducto}>
        Agregar Producto
      </button>

      <h3>Productos en la Factura</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFactura.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${(producto.cantidad * producto.precio).toFixed(2)}</td>
              <td>
                <button
                  className="bton btn-rojo"
                  onClick={() => {
                    // Mostrar confirmación antes de eliminar
                    Swal.fire({
                      title: `¿Eliminar ${producto.nombre}?`,
                      text: "Esta acción no se puede deshacer.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Sí, eliminar",
                      cancelButtonText: "Cancelar",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        eliminarProducto(producto.id); // Usamos directamente la función del hook
                        Swal.fire({
                          icon: "success",
                          title: "Eliminado",
                          text: `${producto.nombre} fue eliminado de la factura.`,
                          timer: 1500,
                          showConfirmButton: false,
                        });
                      }
                    });
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FacturaProductos;