import type { Food } from "../TypeScripts/Food";

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

export async function deleteFood(token: string, id: number): Promise<boolean>
{ 
    const response = await fetch(`http://localhost:5267/api/foods/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
    })

    return response.ok
}

export async function editFood(token: string, food: Food, name?: string, price?: number | null,
     category?: number | null, imageUrl?: string | null): Promise<boolean>
{ 
    
    const response = await fetch(`http://localhost:5267/api/foods/${food.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'price': price,
            'categoryId': category,
            'imageUrl': imageUrl
        })
    })

  
    return response.ok;

}

export async function createFood(token: string, name: string, price: number,
    category: number, imageUrl: string): Promise<boolean>
{ 
    const response = await fetch('http://localhost:5267/api/foods', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'price': price,
            'categoryId': category,
            'imageUrl': imageUrl
        })
    })

    return response.ok

}