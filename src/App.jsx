import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import Home from './pages/Home'
import Facturacion from './pages/Facturacion'
import Productos from './pages/Productos'

function App() {
  

  return (
    
      <Row>
        {/* Menú Lateral */}
        <Col lg={3} className="vh-100">
          <nav className="nav text-center flex-column position-fixed">
            <Link className="nav-link" to="/">Inicio</Link>
            <Link className="nav-link" to="/Facturacion">Facturación</Link>
            <Link className="nav-link" to="/Productos">Gestión de Productos</Link>
          </nav>
        </Col>

        {/* Contenido Principal */}
        <Col lg={8} className='py-3'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facturacion" element={<Facturacion />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </Col>
      </Row>
  )
}

export default App
