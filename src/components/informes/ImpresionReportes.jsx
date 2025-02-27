import { useState } from 'react';

const ImpresionReportes = () => {
    const [ventas, setVentas] = useState([]);
    const [producto, setProducto] = useState('');
    const [rubro, setRubro] = useState('');
    const [error, setError] = useState(null);

    const generarReporte = () => {
        setError(null); // Resetear errores antes de la solicitud
        fetch(`/api/reportes?producto=${producto}&rubro=${rubro}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del reporte');
                }
                return response.json();
            })
            .then((data) => setVentas(data))
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <h2>Generación de Reportes</h2>
            <div className="mb-3">
                <label className="form-label">Producto:</label>
                <input
                    type="text"
                    className="form-control"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Rubro:</label>
                <input
                    type="text"
                    className="form-control"
                    value={rubro}
                    onChange={(e) => setRubro(e.target.value)}
                />
            </div>
            <button onClick={generarReporte} className="btn btn-primary">Generar Reporte</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length > 0 ? (
                        ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.fecha}</td>
                                <td>{venta.producto}</td>
                                <td>{venta.cantidad}</td>
                                <td>{venta.total}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay datos para mostrar</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ImpresionReportes;

