import { useState } from "react";
import createAccount from "../Services/RegisterService"
import "./CategoryAdminPage.css";

function RegisterPage() {

    const [message, setMessage] = useState<string>("")
    const [username, setUsername] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [isCreatingAccount, setIsCreatingAccount] = useState(true);
    async function CreateAccount(event: React.SubmitEvent<HTMLFormElement>)
    {
        event.preventDefault()

        if (!username || !password)
        {
            setMessage("Username and Password Required")
            return;
        }
        const data = await createAccount(username, password); 

        if (data == true)
        {
            setMessage("Account Created")
            setIsCreatingAccount(false)
            
        }
     
        else
            setMessage("Can Not Create Account")

        setUsername(null)
        setPassword(null)
    }

    return (
        <div>
            <h1 className="Title">Register Page</h1>

            {isCreatingAccount && (
                <div>
                <form onSubmit={(event) => CreateAccount(event)} >
                    <input className="Input" type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                        <input className="Input" type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                        <input className="Input" type="submit" value="Create Account" />
                </form>
            </div>
            )}
              
            {
                message && (
                    <h2 className="Message">{message}</h2>
                )

            }
        </div>
    

    )
}

export default RegisterPage