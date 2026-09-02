
export async function orderFood(token: string | null): Promise<boolean>
{
    const response = await fetch("http://localhost:5267/api/Cart", {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    }) 

    if (!response.ok)
        return false;

    return true;
}