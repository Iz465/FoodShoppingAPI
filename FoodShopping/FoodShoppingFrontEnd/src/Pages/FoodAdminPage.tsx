import { useState } from 'react'
import type { Food } from '../TypeScripts/Food'
import { deleteFood, getFood, getFoods } from '../Services/FoodAdminService'

type FoodAdminPageProps = {
    token: string
}

function FoodAdminPage({ token }: FoodAdminPageProps)
{
    const [foods, setFoods] = useState<Food[]>([])
    const [food, setFood] = useState<Food | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>("")

    async function GetFoods()
    {
        setMessage("")
        const data = await getFoods()
        setFoods(data)
    }

    async function GetFood(event: React.SubmitEvent<HTMLFormElement>) // event: React.SubmitEvent<HTMLFormElement>
    {
        event.preventDefault()
        console.log("ID: ", id)
        if (!id)
        {
            setFood(null)
            console.log("Message is: ", message)
            return
        }
            

        const data = await getFood(id)
        if (!data)
            setMessage("User Not Found")
        else
            setMessage("")
        setFood(data)
    }

    async function DeleteFood(food: Food)
    { 
        setFood(null)
        setFoods([])
        if (!food)
            return;
        console.log("Token is: ", token)
        const data = await deleteFood(token, food.id)
        if (!data) { 
            setMessage("Request to remove food item denied")
            return
        }

        setMessage("Food item has been removed")
    }

    

    return (
        <div>
            <h1>Food</h1>
            <form onSubmit={GetFood}>
                <input type="number" placeholder="Search Food ID" onChange={(event) => setId(Number(event.target.value))} />
            </form>
            {message && (
                <p>{message}</p>
            )}
            {food && (
                <p>ID: {food.id}
                    Name: {food.name}
                    Price: {food.price}
                    Quantity: {food.quantity}
                    Category: {food.category}
                    Description: {food.description}
                </p>
            )}
            <button onClick={GetFoods} >View Foods</button>
            {
                foods.map((food) => (
                    <div key={food.id}>
                        <p>ID: {food.id}
                            Name: {food.name}
                            Price: {food.price}
                            Quantity: {food.quantity}
                            Category: {food.category}
                            Description:{food.description}
                            <button>Edit</button>
                            <button onClick={() => DeleteFood(food)}>Delete</button>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default FoodAdminPage
