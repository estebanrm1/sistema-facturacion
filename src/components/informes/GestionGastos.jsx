import { useState } from 'react';

const GestionGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [nuevoGasto, setNuevoGasto] = useState({ descripcion: '', monto: 0 });

    // useEffect(() => {
        
    //     fetch('/api/gastos')
    //         .then((response) => response.json())
    //         .then((data) => setGastos(data));
    // }, []);

    const agregarGasto = () => {
        fetch('/api/gastos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoGasto),
        })
            .then((response) => response.json())
            .then((data) => setGastos([...gastos, data]));
    };

    return (
        <div>
            <h2>Gestión de Gastos</h2>
            <input
                type="text"
                placeholder="Descripción"
                value={nuevoGasto.descripcion}
                onChange={(e) => setNuevoGasto({ ...nuevoGasto, descripcion: e.target.value })}
            />
            <input
                type="number"
                placeholder="Monto"
                value={nuevoGasto.monto}
                onChange={(e) => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })}
            />
            <button onClick={agregarGasto}>Agregar Gasto</button>
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {gastos.map((gasto) => (
                        <tr key={gasto.id}>
                            <td>{gasto.descripcion}</td>
                            <td>{gasto.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionGastos;