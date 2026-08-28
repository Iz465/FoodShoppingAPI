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

