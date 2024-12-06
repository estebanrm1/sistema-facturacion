import React from 'react';
import Login from './Login';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            <div className='text-center'>
            <h1>Sistema de Facturación</h1>
            <p>Bienvenido al sistema de facturación y control de stock.</p>
            </div>
            <div className='d-flex justify-content-center'>
            <Login></Login>
            </div>
        </div>
    );
};

export default Home;