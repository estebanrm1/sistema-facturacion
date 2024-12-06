import React from "react";
import ProductoFila from "./ProductoFila";

const ProductoTabla = ({ productos, onEditar, onEliminar, onAgregarCantidad }) => (
    <table className="table table-striped border-black">
        <thead>
            <tr>
                <th className="fs-5">Nombre</th>
                <th className="fs-5">Precio</th>
                <th className="fs-5">Cantidad</th>
                <th className="fs-5">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {productos.map((producto) => (
                <ProductoFila
                    key={producto.id}
                    producto={producto}
                    onEditar={onEditar}
                    
                    onEliminar={onEliminar}
                    onAgregarCantidad={onAgregarCantidad}
                />
            ))}
        </tbody>
    </table>
);

export default ProductoTabla;
