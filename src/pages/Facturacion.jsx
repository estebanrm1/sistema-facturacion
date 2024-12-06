import React, { useState } from 'react';
import { useProductos } from '../hooks/useProductos'; // Asegúrate de importar useProductos
import useFacturacion from '../hooks/useFacturacion';
import FacturaProductos from '../components/facturacion/FacturaProductos';
import FacturaCliente from '../components/facturacion/FacturaCliente';
import FacturaTotales from '../components/facturacion/FacturaTotales';
import { Row, Col } from 'react-bootstrap';

const Facturacion = () => {


    // Obtener productos del stock
    const { productos } = useProductos(); // Asegúrate de obtener los productos del stock

    const {
        productosFactura,
        cliente,
        total,
        agregarProducto,
        eliminarProducto,
        handleChangeCliente,
        confirmarFactura,
        cancelarFactura,
    } = useFacturacion();


    return (
        <div className="mt-4">
            <h2 className='text-center'>Facturación</h2>
            
            <FacturaProductos 
                productos={productos}
                productosFactura={productosFactura} 
                eliminarProducto={eliminarProducto}
                agregarProducto={agregarProducto} // Asegúrate de pasar la función para agregar productos
            />
            
            <Row className="row mt-3">
                <Col>
                    <FacturaCliente cliente={cliente} handleChangeCliente={handleChangeCliente} />
                </Col>
                <Col lg={2}>
                    <FacturaTotales
                        total={total}
                        confirmarFactura={confirmarFactura}
                        cancelarFactura={cancelarFactura}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Facturacion;

