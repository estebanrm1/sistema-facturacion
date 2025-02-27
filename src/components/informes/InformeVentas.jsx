import { useState } from 'react';

const InformeVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const filtrarVentas = () => {
    fetch(`/api/ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .then((response) => response.json())
            .then((data) => setVentas(data));
  };

    return (
    <div>
        <h2>Informe de Ventas</h2>
            <label>
                Fecha de inicio:
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </label>
            <label>
                Fecha de fin:
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </label>
            <button onClick={filtrarVentas}>Filtrar</button>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.fecha}</td>
                            <td>{venta.producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

    </div>
  );
};

export default InformeVentas;
