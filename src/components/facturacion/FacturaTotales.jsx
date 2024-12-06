import React from "react";
import { Button } from "react-bootstrap";

const FacturaTotales = ({ total, confirmarFactura, cancelarFactura }) => {
  return (
    <div className="my-4 d-flex justify-content-end flex-column">
      <h5>Total: ${total.toFixed(2)}</h5>
      <button className="bton btn-verde my-2" onClick={confirmarFactura}>
        Confirmar Factura
      </button>
      <button className="bton btn-rojo" onClick={cancelarFactura} aria-label="Confirmar factura">
        Cancelar
      </button>
    </div>
  );
};

export default FacturaTotales;
