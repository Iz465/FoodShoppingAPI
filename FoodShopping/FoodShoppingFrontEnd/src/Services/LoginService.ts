

async function login(username: string, password: string)
{
    const response = await fetch('http://localhost:5267/api/users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'username': username, // working username is Vanescula // also an admin
                    'password': password // working password is fangs
                })
        })

    if (response.ok)
    { 
        const data = await response.text()
        return data
    }

}

export default login