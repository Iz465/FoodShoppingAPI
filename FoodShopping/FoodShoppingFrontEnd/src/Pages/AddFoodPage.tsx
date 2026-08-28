import type { Food } from "../TypeScripts/Food"
import "./FoodPage.css"
import "./AddFoodPage.css"
import type { Dispatch, SetStateAction } from "react"
import { getFoodQuantity } from "../Services/CartService"

type AddFoodPageProps = {
    food: Food | null,
    token: string | null,
    setCartQuantityProp: Dispatch<SetStateAction<number | null>>
}

function AddFoodPage({ food, token, setCartQuantityProp }: AddFoodPageProps) {

    async function AddFoodToCart()
    { 
        const response = await fetch("http://localhost:5267/api/cart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'foodId': food?.id,
                'foodQuantity': 1

            })
        })

        if (response.ok) {
            console.log("Food Added To Cart");
            const quantity = await getFoodQuantity(token)
            setCartQuantityProp(quantity)
           
        }
            
        else
            console.log("Failed To Add Food To Cart");

    }

    return (
        <div className="AddFoodBody">

            {
                food && (
                    <div className="AddFoodDiv">
                    
                            <img src={food.imageUrl} className="AddFoodImage" />
                            <div className="IndividualFoodDiv">
                    
                        
                        </div>
                            <div className="AddFoodIndividualDiv">
                        <h1>{food.name}</h1>
                        <h1>Price: {food.price} Dollars</h1>
                            <button className="CartButton ButtonHover" onClick={AddFoodToCart} ><h2>Add To Cart</h2></button>
                        </div>
                </div>
                )}

        
        </div>

    )
}

export default AddFoodPage