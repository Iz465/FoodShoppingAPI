import { useEffect, useState } from "react"
import "./CategoryAdminPage.css"
import type { Cart } from "../TypeScripts/Cart"; 
import "./CartPage.css"

type CartPageProps = {
    token: string
}

function CartPage({token }: CartPageProps)
{ 
    const [cart, setCart] = useState<Cart[]>([]);

    useEffect(() => { 
        async function GetCartList()
        {
            const response = await fetch("http://localhost:5267/api/Cart", {
                headers: {'Authorization': `Bearer ${token}`}
            })

            if (!response.ok)
                return
            const data = await response.json()
            setCart(data)
            console.log(data)
                
        }


        GetCartList()

    }, [token])

    async function RemoveItemFromCart()
    {

    }

    return (
        <div>
      
            <h1 className="Title">Shopping Cart</h1>
            <div className="CartListCategories">
                <h2>Food</h2>
                <h2>Quantity</h2>
                <h2>Price</h2>
                <h2>Remove</h2>
            </div>
            {
                cart &&
                cart.map((item) => (
                    <div className="CartListItems" key={item.id} >

                        <p>{item.food}</p>
                        <p>{item.quantity}</p>
                        <p>${item.totalPrice}</p>
                        <button className="CartRemoveButton" onClick={() => RemoveItemFromCart}>Remove Item</button>
            </div>
        ))
            }
        </div>
    )
}

export default CartPage