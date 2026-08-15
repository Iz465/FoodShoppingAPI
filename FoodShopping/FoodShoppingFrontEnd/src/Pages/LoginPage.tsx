import { Link } from 'react-router-dom'
import login from '../Services/LoginService'
import type {Dispatch, SetStateAction} from 'react'

type LoginPageProps = {
    setToken: Dispatch<SetStateAction<string>>
}
function LoginPage({ setToken }: LoginPageProps)
{

   

    async function CheckLogin()
    {
        const token = await login()
        setToken(token)


        console.log("1. LOGIN RETURNED:", token);
    }
   

    return (
        <div>
                        <h1>Login Page</h1>
                        <p>Enter da passypass & da uzer</p>
                        <button onClick={CheckLogin}>Click to login to your account(change for user input after)</button>
                        <p></p>
                        <p></p>
                        <Link to="/">Home</Link>
                
          
        </div>
    )
}

export default LoginPage


