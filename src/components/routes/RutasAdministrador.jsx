import { Route, Routes } from "react-router-dom"
import Productos from "../../pages/Productos"
import Facturacion from "../../pages/Facturacion"
import Informes from "../../pages/Informes"
// import GestionGastos from"../informes/GestionGastos"



const RutasAdministrador = () => {
  return (
    <>
        <Routes>
            <Route path="/Productos" element={<Productos />}/>
            <Route path="/Facturacion" element={<Facturacion />} />
            <Route path="/Informes" element= {<Informes />} />
            {/* <Route path="/informes/gastos" element={<GestionGastos />} /> */}
        </Routes>
    </>
  )
}

export default RutasAdministrador