export async function getFoodQuantity(token: string | null): Promise<number> {

    const response = await fetch("http://localhost:5267/api/Cart/Quantity", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok)
        return 0;
 
    const data = await response.json()
    console.log(data);

    return data;
}


export async function updateCartQuantity(token: string | null, cartId: number): Promise<boolean> {

    const response = await fetch(`http://localhost:5267/api/Cart/${cartId}`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${token}`}
    })

    return response.ok;
}

