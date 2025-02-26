import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import { Route, Routes } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Login from './pages/Login';
import Menu from './pages/Menu';
import RutasProtegidas from './components/routes/RutasProtegidas';
import RutasAdministrador from './components/routes/RutasAdministrador';

function App() {

  const usuariosSessionStorage = JSON.parse(sessionStorage.getItem('usuario')) || {};

  const [usuarioLogueado, setUsuarioLogueado] = useState(usuariosSessionStorage);



  return (
    
      <Row>
        {/* Menú Lateral */}
        <Menu 
        usuarioLogueado = {usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
        ></Menu>
        {/* Contenido Principal */}
        <Col lg={8} className='py-3'>
          <Routes>
            <Route exact path="/" element={<Login setUsuarioLogueado={setUsuarioLogueado}/>} />
            <Route path="/administrador/*" element={
              <RutasProtegidas>
              <RutasAdministrador></RutasAdministrador>
            </RutasProtegidas>} />
          </Routes>
        </Col>
      </Row>
  )
}

export default App
