async function login()
{
    const response = await fetch('http://localhost:5267/api/users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    'username': "Vanescula", // working username is Vanescula
                    'password': "fangs" // working password is fangs
                })
        })

    const data = await response.json()

    console.log(data)

}

export default login