
async function createAccount(username: string, password: string): Promise<boolean>
{
    const response = await fetch('http://localhost:5267/api/users/register',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(
            {
                    'username': username,
                    'password': password
            })

        })
    return response.ok
}

export default createAccount