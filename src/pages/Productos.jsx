import React, { useMemo } from "react";
import ProductoModal from "./ProductoModal";
import ProductoTabla from "./ProductoTabla";
import { useProductos } from "../hooks/useProductos";

const Productos = () => {
    const {
        productos,
        showModal,
        modo,
        productoActual,
        errores,
        filtro,
        handleAction,
        handleEditar,
        handleAgregarCantidad,
        handleAgregarProducto,
        handleEliminar,
        setFiltro,
        setShowModal,
        setProductoActual,
    } = useProductos();

    const productosFiltrados = useMemo(() => {
        return productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
    }, [productos, filtro]);

    return (
        <div className="p-5">
            <h3 className="text-center">Gestion de Productos</h3>
            <div className="container-input my-4">
                <input
                    required="requided"
                    type="text"
                    className="inp w-50"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    name="filtro"
                />
                <span className="content">Buscar Producto por nombre</span>
            </div>
            <button
                className="bton btn-azul mb-3"
                onClick={handleAgregarProducto}
                aria-label="Agregar nuevo producto"
            >
                Agregar Producto
            </button>
            <ProductoTabla
                productos={productosFiltrados}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onAgregarCantidad={handleAgregarCantidad}
            />
            <ProductoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                modo={modo}
                producto={productoActual}
                setProducto={setProductoActual}
                handleAction={handleAction}
                errores={errores}
            />
        </div>
    );
};

export default Productos;


