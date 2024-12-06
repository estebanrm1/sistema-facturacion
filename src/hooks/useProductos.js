import { useState } from 'react';
import Swal from 'sweetalert2';

export const useProductos = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: "Producto 1", precio: 100, cantidad: 10 },
        { id: 2, nombre: "Producto 2", precio: 200, cantidad: 15 },
        { id: 3, nombre: "Producto 3", precio: 250, cantidad: 20 },
        { id: 4, nombre: "Producto 4", precio: 350, cantidad: 25 },
        
    ]);
    const [showModal, setShowModal] = useState(false);
    const [modo, setModo] = useState(""); // "editar", "agregar", "cantidad"
    const [productoActual, setProductoActual] = useState({
        id: null,
        nombre: "",
        precio: 0,
        cantidad: 0,
    });
    const [errores, setErrores] = useState({});
    const [filtro, setFiltro] = useState("");

    // Validación del formulario
    const validarFormulario = () => {
        const errores = {};
        if (!productoActual.nombre.trim() && modo !== "cantidad") {
            errores.nombre = "El nombre es obligatorio.";
        }
        if (productoActual.precio <= 0 && modo !== "cantidad") {
            errores.precio = "El precio debe ser mayor a 0.";
        }
        if (productoActual.cantidad <= 0) {
            errores.cantidad = "La cantidad debe ser mayor a 0.";
        }
        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    // Manejo de las acciones (agregar, editar, cantidad)
    const handleAction = () => {
        if (!validarFormulario()) return;

        let mensaje = "";

        if (modo === "editar") {
            setProductos(
                productos.map((p) => (p.id === productoActual.id ? productoActual : p))
            );
            mensaje = "Producto editado correctamente.";
        } else if (modo === "agregar") {
            const existeProducto = productos.some(
                (p) => p.nombre.toLowerCase() === productoActual.nombre.toLowerCase()
            );
            if (existeProducto) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El producto ya existe en el inventario.",
                });
                return;
            }
            setProductos([...productos, { ...productoActual, id: Date.now() }]);
            mensaje = "Producto agregado correctamente.";
        } else if (modo === "cantidad") {
            setProductos(
                productos.map((p) =>
                    p.id === productoActual.id
                        ? { ...p, cantidad: p.cantidad + productoActual.cantidad }
                        : p
                )
            );
            mensaje = "Cantidad agregada correctamente.";
        }

        setShowModal(false);
        setProductoActual({});
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: mensaje,
        });
    };

    // Funciones para manejar acciones en productos
    const handleEditar = (producto) => {
        setProductoActual(producto);
        setModo("editar");
        setShowModal(true);
    };

    const handleAgregarCantidad = (producto) => {
        setProductoActual({ ...producto, cantidad: "" });
        setModo("cantidad");
        setShowModal(true);
    };

    const handleAgregarProducto = () => {
        setProductoActual({ nombre: "", precio: "", cantidad: "" });
        setModo("agregar");
        setShowModal(true);
    };

    const handleEliminar = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                setProductos(productos.filter((p) => p.id !== id));
                Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
            }
        });
    };

    // Filtrar productos por nombre
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return {
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
        setModo,
    };
};
