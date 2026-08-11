import * as React from "react"
import login from '../Services/LoginService'

function LoginPage()
{
    return (
        <div>
            <h1>Login Page</h1>
            <p>Enter da passypass & da uzer</p>
            <button onClick={login}>Click to login to your account(change for user input after)</button>
        </div>
    )
}

export default LoginPage


