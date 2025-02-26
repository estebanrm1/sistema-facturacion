import React from 'react'
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { iniciarSesion } from '../components/helpers/queries';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = ({setUsuarioLogueado}) => {

    const { register, handleSubmit, formState:{errors}, reset} = useForm();
    const navegacion = useNavigate();

    const onSubmit = (usuario)=>{
        console.log(usuario);
        iniciarSesion(usuario).then((respuesta)=>{
            if(respuesta){
                sessionStorage.setItem('usuario', JSON.stringify(respuesta))
                setUsuarioLogueado(respuesta)
                Swal.fire({
                    title: "BIENVENIDO",
                    text: `${usuario.usuario}`,
                    icon: "success",
                    timer:1500,
                    showConfirmButton:false
                });
                setUsuarioLogueado(respuesta)
                reset();
                navegacion('/productos');
            }else{
                Swal.fire(
                    'Error',
                    'El usuario o password son incorrectos',
                    'error'
                )
            }
        });
        reset()
    }

    return (
        <div className='text-center'>
        <h1>Sistema de Facturación</h1>
        <p>Bienvenido al sistema de facturación y control de stock.</p>
        <div className='d-flex justify-content-center'>
        <div className="login">
            <div className="h1">Login</div>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Usuario" id="user" name="user" type="text"
            {...register('usuario', {
                required:'El usuario es obligatorio'
            })}/>
            <Form.Text className='text-danger'>
                {errors.usuario?.message}
            </Form.Text>
            <input placeholder="Password" id="password" name="password" type="password"
            {...register('password',{
                required: 'El password es obligatorio',
                minLength:{
                    value:8,
                    message:"El password debe contener al menos 8 caracteres"
                },
                maxLength:{
                    value:16,
                    message:"El nombre debe contener como maximo 16 caracteres"
                },
                pattern:{
                    value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                    message:'El password debe tener al menos una mayuscula, 1 minuscula y 1 numero. NO puede tener otros simbolos'
                }
            })}
            />
            <Form.Text className='text-danger fs-6'>
                {errors.password?.message}
            </Form.Text>
            <input value="Login" className="btn-login" type="submit" />
            </Form>
        </div>
        </div>
        </div>
    )
}

export default Login