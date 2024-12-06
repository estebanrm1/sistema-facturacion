import React from "react";

const ProductoFila = ({ producto, onEditar, onEliminar, onAgregarCantidad }) => {
    const obtenerClaseFila = (cantidad) => {
        if (cantidad <= 1) return "table-danger";
        if (cantidad <= 5) return "table-warning";
        return "";
    };

    return (
        <tr className={obtenerClaseFila(producto.cantidad)}>
            <td>{producto.nombre}</td>
            <td>{producto.precio}</td>
            <td>{producto.cantidad}</td>
            <td>
                <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEditar(producto)}
                >
                    Editar
                </button>
                <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => onAgregarCantidad(producto)}
                >
                    Agregar Cantidad
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onEliminar(producto.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default ProductoFila;
