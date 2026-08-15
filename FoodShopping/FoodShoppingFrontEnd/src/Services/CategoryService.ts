

async function GetCategories()
{


    const response = await fetch('http://localhost:5267/api/category')

    const data = await response.json()

    return data
}

export default GetCategories