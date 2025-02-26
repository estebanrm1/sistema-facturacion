import { Link, useNavigate } from 'react-router-dom'
import { Button, Col } from 'react-bootstrap';

const Menu = ({usuarioLogueado, setUsuarioLogueado}) => {
  const navegacion = useNavigate()
  const cerrarSesion = ()=>{
    sessionStorage.removeItem('usuario');
    setUsuarioLogueado({});
    navegacion('/');
  }

  return (
    <>
    <Col lg={3} className="vh-100">
        <nav className="nav text-center flex-column position-fixed">
            {
              (usuarioLogueado.usuario )?
              <>
              <Button variant='dark' onClick={cerrarSesion}>Cerrar sesión</Button>
              <Link className="nav-link" to="administrador/Facturacion">Facturación</Link>
              <Link className="nav-link" to="administrador/Productos">Administrador</Link>
              </>:<Link className="nav-link" to="/">Abrir sesión</Link>
            }
        </nav>
        </Col>
    </>
  )
}

export default Menu