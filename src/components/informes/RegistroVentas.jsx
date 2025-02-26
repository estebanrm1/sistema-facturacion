import { useEffect, useState } from 'react'

const RegistroVentas = () => {
    const [ventas, setVentas] = useState([]);
    useEffect(() => {
        // aqui llamas a tu api para obtener los datos de las ventas 
        fetch('https://api.example.com/ventas')
        .then((response)  => response.json())
        .then((data) => setVentas(data));
}, []);




  return (
    <div>
        <h2>Registro de Ventas</h2>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th> 
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                    <th>Cliente</th>
                </tr>
            </thead>
            <tbody>
            {ventas.map((venta) => (
            <tr key={venta.id}>
                            <td>{venta.fecha}</td>
                            <td>{venta.producto}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.precio}</td>
                            <td>{venta.total}</td>
                            <td>{venta.cliente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistroVentas

