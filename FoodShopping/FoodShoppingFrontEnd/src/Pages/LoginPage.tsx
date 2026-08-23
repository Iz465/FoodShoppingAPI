
import login from '../Services/LoginService'
import { useState, type Dispatch, type SetStateAction } from 'react'
import "./CategoryAdminPage.css";


type LoginPageProps = {
    setToken: Dispatch<SetStateAction<string>>
}
function LoginPage({ setToken }: LoginPageProps)
{

    const [message, setMessage] = useState<string>("")
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    async function CheckLogin(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!username || !password)
        {
            setMessage("Information Required")
            return
        }
        const token = await login(username, password)
        if (token)
        { 
            setToken(token)

            setMessage(`Welcome Back ${username}`)
            setPassword(null)
            setIsLoggingIn(false)
        }

        else
            setMessage("Invalid Login Information")
       
        console.log("1. LOGIN RETURNED:", token);
    }
   

    return (
         <div >
     
           
            <h1 className="Title">Login Page</h1>
            {isLoggingIn && (
                <form onSubmit={(event) => CheckLogin(event)} >
                    <input className="Input" type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                    <input className="Input" type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                    <input className="Input" type="submit" />
                </form>
            )
            }
        
                   
                    
            {message && (
                <h2 className="Message">{message }</h2>
            )}
       
                
          
        </div>
    )
}

export default LoginPage


