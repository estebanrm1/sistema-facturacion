import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductoModal = ({
    show,
    onHide,
    modo,
    producto,
    setProducto,
    handleAction,
    errores,
}) => {
    // Asegurarse de que los valores predeterminados estén siempre definidos
    const productoValido = {
        nombre: producto?.nombre || "",  // Si no existe, se asigna una cadena vacía
        precio: producto?.precio || 0,    // Si no existe, se asigna 0
        cantidad: producto?.cantidad || 0 // Si no existe, se asigna 0
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {modo === "editar" && "Editar Producto"}
                    {modo === "agregar" && "Agregar Producto"}
                    {modo === "cantidad" && "Agregar Cantidad"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errores.general && (
                    <div className="alert alert-danger">{errores.general}</div>
                )}
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nombre del producto"
                        value={productoValido.nombre}  // Usamos el valor predeterminado si es necesario
                        onChange={(e) =>
                        setProducto({ ...producto, nombre: e.target.value })
                        }
                        isInvalid={!!errores.nombre}
                        disabled={modo === "cantidad"}
                        name="nombre"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                {modo !== "cantidad" && (
                    <Form.Group controlId="precio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Precio del producto"
                            value={productoValido.precio}  // Usamos el valor predeterminado si es necesario
                            onChange={(e) =>
                                setProducto({
                                    ...producto,
                                    precio: parseFloat(e.target.value),
                                })
                            }
                            isInvalid={!!errores.precio}
                            name="precio"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.precio}
                        </Form.Control.Feedback>
                    </Form.Group>
                )}

                {(modo === "cantidad" || modo === "agregar") && (
                    <Form.Group controlId="cantidad">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Cantidad"
                            value={productoValido.cantidad}  // Usamos el valor predeterminado si es necesario
                            onChange={(e) =>
                                setProducto({
                                    ...producto,
                                    cantidad: parseInt(e.target.value, 10),
                                })
                            }
                            isInvalid={!!errores.cantidad}
                            name="cantidad"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errores.cantidad}
                        </Form.Control.Feedback>
                    </Form.Group>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="bton btn-verde" variant="primary" onClick={handleAction}>
                    {modo === "editar" ? "Guardar Cambios" : "Confirmar"}
                </button>
                <button className="bton btn-rojo" variant="secondary" onClick={onHide}>
                    Cancelar
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductoModal; 