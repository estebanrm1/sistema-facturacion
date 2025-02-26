import { Route, Routes } from "react-router-dom"
import Productos from "../../pages/Productos"
import Facturacion from "../../pages/Facturacion"



const RutasAdministrador = () => {
  return (
    <>
        <Routes>
            <Route path="/Productos" element={<Productos />}/>
            <Route path="/Facturacion" element={<Facturacion />} />
        </Routes>
    </>
  )
}

export default RutasAdministrador