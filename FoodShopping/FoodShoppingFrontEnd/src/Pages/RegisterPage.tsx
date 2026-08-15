import CreateAccount from "../Services/RegisterService"

function RegisterPage() {
    return (
        <div>
            <h1>Register Page</h1>
            <p></p>
            <button onClick={CreateAccount}>Create Your Account!</button>
        </div>

    )
}

export default RegisterPage