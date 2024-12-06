import React from "react";
import { Form } from "react-bootstrap";

const FacturaCliente = ({ cliente, handleChangeCliente }) => {
  return (
    <div>
      <h5>Datos del Cliente</h5>
      <Form>
        <Form.Group controlId="clienteNombre">
          <div className="container-input">
            <input className="inp"
            required="required" 
            name="nombreCliente"
            type="text"
            value={cliente.nombre}
            onChange={handleChangeCliente}
            />
            <span className="content">Nombre</span>
          </div>
        </Form.Group>
        <Form.Group controlId="clienteDNI" className="mt-3">
          <div className="container-input">
          <input type="text" className="inp" 
          required="required"
          name="dni"
          value={cliente.dni}
          onChange={handleChangeCliente}
          />
          <span className="content">DNI</span>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FacturaCliente;
