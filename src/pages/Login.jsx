import React from 'react'

const Login = () => {
    return (
        <div class="login">
            <div class="h1">Login</div>
            <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" />
            <input placeholder="Password" id="password" name="password" type="password" />
            <input value="Login" class="btn-login" type="submit" />
        </div>
    )
}

export default Login