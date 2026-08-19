import { useState } from 'react'
import type { Food } from '../TypeScripts/Food'
import { createFood, deleteFood, editFood, getFood, getFoods } from '../Services/FoodAdminService'

type FoodAdminPageProps = {
    token: string
}

function FoodAdminPage({ token }: FoodAdminPageProps)
{
    const [foods, setFoods] = useState<Food[]>([])
    const [food, setFood] = useState<Food | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>("")
    const [isfoodEdit, setIsFoodEdit] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number | null>(null)
    const [quantity, setQuantity] = useState<number | null>(null)
    const [category, setCategory] = useState<number | null>(null)
    const [isCreateFood, setIsCreateFood] = useState<boolean>(false)



    async function GetFoods()
    {
        setIsFoodEdit(false)
        setIsCreateFood(false);
        setMessage("")
        const data = await getFoods()
        setFoods(data)
    }

    async function GetFood(event: React.SubmitEvent<HTMLFormElement>) // event: React.SubmitEvent<HTMLFormElement>
    {
        event.preventDefault()
        setIsFoodEdit(false)
        setIsCreateFood(false);
        console.log("ID: ", id)
        if (!id)
        {
            setFood(null)
            console.log("Message is: ", message)
            return
        }
            

        const data = await getFood(id)
        if (!data)
            setMessage("Food Item Not Found")
        else
            setMessage("")
        setFood(data)
    }

    async function DeleteFood(food: Food)
    { 
        setIsFoodEdit(false)
        setIsCreateFood(false);
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

    async function EditFood(food: Food)
    { 
        setFood(food)
        setFoods([])
        setIsFoodEdit(true)
       

    }

    async function SubmitEditFood(event: React.SubmitEvent<HTMLFormElement>, food: Food)
    { 
        event.preventDefault()
        setFood(null)
        setFoods([])

        const foodIsEdited = await editFood(token, food, name, price, quantity, category)
        if (foodIsEdited)
            setMessage("Food has been edited")
       
        else
            setMessage("Can not be edited")
       
    }

    async function CreateFood()
    { 
        setMessage("Create Food")
        setIsCreateFood(true);
    }

    async function SubmitCreateFood(event: React.SubmitEvent<HTMLFormElement>)
    { 
        event.preventDefault()

        const foodIsCreated = await createFood(token, name, price!, quantity!, category!)

        if (foodIsCreated) { 
            setMessage("Food Added")
            setIsCreateFood(false)
            setFood(null)
            setFoods([])
        }
          
        else
            setMessage("Could Not Add Food")

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
                    <button onClick={() => EditFood(food)} >Edit</button>
                    <button onClick={() => DeleteFood(food)}>Delete</button>
                </p>
            )}

            {isfoodEdit && food &&(
                <div>
                    <h1>Edit Food</h1>
                    <form onSubmit={(event) => SubmitEditFood(event, food)}>
                        <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                        <input type="number" placeholder="Price" onChange={(event) => setPrice(Number(event.target.value)) } />
                        <input type="number" placeholder="Quantity" onChange={(event) => setQuantity(Number(event.target.value))} />
                        <input type="number" placeholder="Category" onChange={(event) => setCategory(Number(event.target.value))} />
                        <input type="submit" placeholder="Submit" />
                    </form>
                </div>
                )
            }
            {isCreateFood && (
                <div>
                    <form onSubmit={(event) => SubmitCreateFood(event)} >
                        <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                        <input type="number" placeholder="Price" onChange={(event) => setPrice(Number(event.target.value))} />
                        <input type="number" placeholder="Quantity" onChange={(event) => setQuantity(Number(event.target.value))} />
                        <input type="number" placeholder="Category" onChange={(event) => setCategory(Number(event.target.value))} />
                        <input type="submit" placeholder="Submit" />
                    </form>
                </div>
            )}

            <button onClick={GetFoods} >View Foods</button>
            <button onClick={CreateFood}>Add Food Item</button>
            {
                foods.map((food) => (
                    <div key={food.id}>
                        <p>ID: {food.id}
                            Name: {food.name}
                            Price: {food.price}
                            Quantity: {food.quantity}
                            Category: {food.category}
                            <button onClick={() => EditFood(food)}>Edit</button>
                            <button onClick={() => DeleteFood(food)}>Delete</button>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default FoodAdminPage
