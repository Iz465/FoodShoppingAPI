import { useState } from 'react'
import type { Food } from '../TypeScripts/Food'
import { createFood, deleteFood, editFood, getFood, getFoods } from '../Services/FoodAdminService'
import "./CategoryAdminPage.css";

type FoodAdminPageProps = {
    token: string
}

function FoodAdminPage({ token }: FoodAdminPageProps)
{
    const [foods, setFoods] = useState<Food[]>([])
    const [food, setFood] = useState<Food | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>("")
    const [isfoodEdit, setIsFoodEdit] = useState(false)
    const [isfoodSearch, setIsfoodSearch] = useState(false)
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<number | null>(null)
    const [category, setCategory] = useState<number | null>(null)
    const [isCreateFood, setIsCreateFood] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)



    async function GetFoods()
    {
        setIsfoodSearch(false);
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
        setFoods([])
        console.log("ID: ", id)
        if (!id)
        {
            setFood(null)
            console.log("Message is: ", message)
            return
        }

        setIsfoodSearch(true);
        const data = await getFood(id)
        if (!data)
            setMessage("Food Item Not Found")
        else
            setMessage("")
        setFood(data)
    }

    async function DeleteFood(food: Food)
    { 
        setIsfoodSearch(false);
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
        setIsfoodSearch(false);
        setFood(food)
        setFoods([])
        setMessage("Edit Food")
        setIsFoodEdit(true)
        setIsCreateFood(false);
       

    }

    async function SubmitEditFood(event: React.SubmitEvent<HTMLFormElement>, food: Food)
    { 
        event.preventDefault()
        setFood(null)
        setFoods([])

        const foodIsEdited = await editFood(token, food, name, price, category, imageUrl)
        if (foodIsEdited)
            setMessage("Food has been edited")
       
        else
            setMessage("Can not be edited")
       
    }

    async function CreateFood()
    { 
        setMessage("Create Food")
        setIsCreateFood(true)
        setIsFoodEdit(false)
        setIsfoodSearch(false)
        setFoods([])
    }

    async function SubmitCreateFood(event: React.SubmitEvent<HTMLFormElement>)
    { 
        event.preventDefault()

        const foodIsCreated = await createFood(token, name, price!, category!, imageUrl!)

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
            <h1 className="Title">Food</h1>
            <form onSubmit={GetFood}>
                <input className="Input" type="number" placeholder="Search Food ID" onChange={(event) => setId(Number(event.target.value))} />
            </form>
         
         
            <button className="AdminCategoryButton FlashGrey MarginUpDown20" onClick={GetFoods} >View Foods</button>
            <button className="AdminCategoryButton FlashGrey MarginUpDown20" onClick={CreateFood}>Add Food Item</button>

            {message && (
                <h2 className="Message">{message}</h2>
            )}

            {isfoodEdit && food && (
                <div>

                    <form onSubmit={(event) => SubmitEditFood(event, food)}>
                        <input className="Input" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                        <input className="Input" type="number" placeholder="Price" onChange={(event) => setPrice(Number(event.target.value))} />
                        <input className="Input" type="number" placeholder="Category" onChange={(event) => setCategory(Number(event.target.value))} />
                        <input className="Input" type="text" placeholder="Image Url" onChange={(event) => setImageUrl(event.target.value) } />
                        <input className="Input" type="submit" placeholder="Submit" />
                    </form>
                </div>
            )
            }
            {isCreateFood && (
                <div>
                    <form onSubmit={(event) => SubmitCreateFood(event)} >
                        <input className="Input" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                        <input className="Input" type="number" placeholder="Price" onChange={(event) => setPrice(Number(event.target.value))} />
                        <input className="Input" type="number" placeholder="Category" onChange={(event) => setCategory(Number(event.target.value))} />
                        <input className="Input" type="text" placeholder="Image Url" onChange={(event) => setImageUrl(event.target.value)} />
                        <input className="Input" type="submit" placeholder="Submit" />
                    </form>
                </div>
            )}

            {food && isfoodSearch && (
                <div className="AdminFoodItems">
                    <p>{food.id}</p>
                    <p>{food.name}</p>
                    <p>{food.price}</p>
                    <p>{food.category}</p>
                    <div>
                        <button className="AdminCategoryButton EditButton FlashGreen" onClick={() => EditFood(food)} >Edit</button>
                        <button className="AdminCategoryButton DeleteButton FlashRed" onClick={() => DeleteFood(food)}>Delete</button>
                    </div>
                </div>
            )}

            {
                foods.map((food) => (
                    <div className="AdminFoodItems" key={food.id}>
                        <p > {food.id}  </p>
                        <p > {food.name} </p>
                        <p > {food.price} </p>
                        <p > {food.category} </p>
                        <div >
                            <button className="AdminCategoryButton EditButton FlashGreen" onClick={() => EditFood(food)}>Edit</button>
                            <button className="AdminCategoryButton DeleteButton FlashRed" onClick={() => DeleteFood(food)}>Delete</button>
                      </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FoodAdminPage
