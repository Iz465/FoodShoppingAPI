
async function getUsers(token: string) 
{ 
    const response = await fetch('http://localhost:5267/api/users', {
        headers: { 'Authorization': `Bearer ${token}`}
    })

    if (!response.ok)
    {
        console.log("Not allowed access")
        return [];
    }
    const data = await response.json()
    console.log(data)
    return data

}

export default getUsers

export async function getUser(token: string, id: number)
{ 
    const response = await fetch(`http://localhost:5267/api/users/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })

    if (!response.ok) {
        console.log("Not allowed access")
        return null;
    }
    const data = await response.json()
    console.log(data)
    return data
}
