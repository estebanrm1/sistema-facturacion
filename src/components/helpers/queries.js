const URL_usuario = import.meta.env.VITE_API_USUARIOS

export const iniciarSesion = async(usuario)=>{
    try {
        const respuesta = await fetch(URL_usuario);
        const listaUsuarios = await respuesta.json();
        const usuarioBuscado = listaUsuarios.find((itemUsuario)=>itemUsuario.usuario === usuario.usuario);
        if(usuarioBuscado){
            if(usuarioBuscado.password === usuario.password){
                return usuarioBuscado;
            }else{
                console.log('La contraseña es incorrecta');
                return null
            }
        }else{
            console.log('El usuario es incorrecto');
            
            return null
        }
    } catch (error) {
        console.log(error);
        
    }
}