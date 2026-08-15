
async function CreateAccount()
{
    await fetch('http://localhost:5267/api/users/register',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(
            {
                'username': "Jaddy",
                'password': "fightCaves"
            })

        })
    
}

export default CreateAccount