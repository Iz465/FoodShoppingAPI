

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
                    'username': "Vanescula", // working username is Vanescula // also an admin 
                    'password': "fangs" // working password is fangs
                })
        })

    const data = await response.text()


   // console.log(data)

    return data

}

export default login