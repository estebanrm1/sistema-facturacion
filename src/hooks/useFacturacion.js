import { useState, useCallback } from "react";
import Swal from "sweetalert2";

const useFacturacion = () => {
  
  const [productosFactura, setProductosFactura] = useState([]);
  const [cliente, setCliente] = useState({ nombre: "", dni: "" });
  const [total, setTotal] = useState(0);

  // Recalcular el total de manera correcta con los productos actualizados
  const recalcularTotal = useCallback((productos) => {
    const nuevoTotal = productos.reduce((acc, p) => acc + p.subtotal, 0);
    setTotal(nuevoTotal);
  }, []);

  const agregarProducto = useCallback(
    (producto, cantidad = 1) => {
      if (!producto.id || !producto.precio) {
        console.error("Producto inválido", producto);
        return;
      }
  
      setProductosFactura((prevProductos) => {
        const productoExistente = prevProductos.find((p) => p.id === producto.id);
  
        if (productoExistente) {
          // Calcular el stock restante
          const stockRestante = producto.cantidad - productoExistente.cantidad;
  
          if (cantidad > stockRestante) {
            // Alerta si excede el stock restante
            Swal.fire({
              icon: "error",
              title: "Stock insuficiente",
              text: `Solo puedes agregar hasta ${stockRestante} unidades más de ${producto.nombre}.`,
              confirmButtonText: "Aceptar",
            });
            return prevProductos; // No actualiza la factura
          }
  
          // Actualizar la cantidad y subtotal
          const productosActualizados = prevProductos.map((p) =>
            p.id === producto.id
              ? {
                  ...p,
                  cantidad: p.cantidad + cantidad,
                  subtotal: (p.cantidad + cantidad) * producto.precio,
                }
              : p
          );
          recalcularTotal(productosActualizados); // Recálculo después de actualizar
          return productosActualizados;
        } else {
          // Validar que la cantidad inicial no exceda el stock total
          if (cantidad > producto.cantidad) {
            Swal.fire({
              icon: "error",
              title: "Stock insuficiente",
              text: `No puedes agregar más de ${producto.cantidad} unidades de ${producto.nombre}.`,
              confirmButtonText: "Aceptar",
            });
            return prevProductos; // No actualiza la factura
          }
  
          // Agregar el producto nuevo
          const nuevosProductos = [
            ...prevProductos,
            { ...producto, cantidad, subtotal: producto.precio * cantidad },
          ];
          recalcularTotal(nuevosProductos); // Recálculo después de agregar
          return nuevosProductos;
        }
      });
    },
    [recalcularTotal]
  );
  
  

  const eliminarProducto = useCallback((id) => {
    setProductosFactura((prevProductos) => {
      const productosRestantes = prevProductos.filter((p) => p.id !== id);
      recalcularTotal(productosRestantes); // Recálculo después de eliminar
      return productosRestantes;
    });
  }, [recalcularTotal]);

  const handleChangeCliente = useCallback((e) => {
    setCliente((prevCliente) => ({
      ...prevCliente,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const confirmarFactura = useCallback(() => {
    console.log("Factura confirmada", { cliente, productosFactura, total });
    // Aquí podrías agregar lógica para guardar la factura en una base de datos, por ejemplo.
  }, [cliente, productosFactura, total]);

  const cancelarFactura = useCallback(() => {
    setProductosFactura([]);
    setCliente({ nombre: "", dni: "" });
    setTotal(0);
  }, []);

  return {
    productosFactura,
    cliente,
    total,
    agregarProducto,
    eliminarProducto,
    handleChangeCliente,
    confirmarFactura,
    cancelarFactura,
  };
};

export default useFacturacion;

