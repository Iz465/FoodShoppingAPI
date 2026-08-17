
export async function getFoods()
{
    const response = await fetch("http://localhost:5267/api/foods")

    if (!response.ok)
        return [];

    const data = response.json()

    return data;
}

export async function getFood(id: number)
{ 
    const response = await fetch(`http://localhost:5267/api/foods/${id}`)
    
    if (!response.ok)
        return null;

    const data = response.json()
    return data;
}

export async function deleteFood(token: string, id: number)
{ 
    const response = await fetch(`http://localhost:5267/api/foods/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
    })

    if (!response.ok)
        return null;
    const data = response.json()
    return data;
}