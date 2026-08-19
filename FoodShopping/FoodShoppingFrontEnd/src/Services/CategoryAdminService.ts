
export async function getCategories()
{
    const response = await fetch('http://localhost:5267/api/category')

    if (response.ok)
    {
        return response.json()
    }

    else
        console.log("GET Request Failed")
    
}

export async function deleteCategory(token: string, id: number): Promise<boolean>
{ 
    const response = await fetch(`http://localhost:5267/api/category/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
    })

    return response.ok
}

export async function createCategory(token: string, name: string, imageUrl: string): Promise<boolean>
{
    const response = await fetch(`http://localhost:5267/api/category`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'imageUrl': imageUrl
        })
    })

    return response.ok
}

export async function editCategory(token: string, id: number, name?: string | null, imageUrl?: string | null): Promise<boolean>
{
    const response = await fetch(`http://localhost:5267/api/category/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'imageUrl': imageUrl
        })
    })

    return response.ok
}