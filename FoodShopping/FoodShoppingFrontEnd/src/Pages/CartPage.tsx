import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import "./CategoryAdminPage.css"
import type { Cart } from "../TypeScripts/Cart"; 
import "./CartPage.css"
import { getFoodQuantity, updateCartQuantity } from "../Services/CartService";
import { Link } from "react-router-dom";

type CartPageProps = {
    token: string,
    setCartQuantityProp: Dispatch<SetStateAction<number | null>>,
    setTotalCartPriceProp: Dispatch<SetStateAction<number | null>>,
    totalCartPriceProp: number | null
}

function CartPage({ token, setCartQuantityProp, totalCartPriceProp, setTotalCartPriceProp }: CartPageProps)
{ 
    const [cart, setCart] = useState<Cart[]>([]);


    useEffect(() => { 
        GetCartList()
    }, [token],)


    async function GetCartList() {
        const response = await fetch("http://localhost:5267/api/Cart", {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        if (!response.ok)
            return
        const data: Cart[] = await response.json()
        setCart(data)
        console.log(data)

        const totalPrice = data.reduce(
            (total, item) => total + item.totalPrice,
            0)
        setTotalCartPriceProp(totalPrice)
    }

    async function UpdateCartQuantity(foodId: number)
    {
        await updateCartQuantity(token, foodId);
        await GetCartList()
        const updated = await getFoodQuantity(token)
        if (updated)
            setCartQuantityProp(updated);
        else
            setCartQuantityProp(null);
    }

    return (
        <div>
      
            <h1 className="Title">Shopping Cart</h1>
            <div className="CheckOutDiv">
                <h2>Total Price: ${totalCartPriceProp}</h2>
                <Link to="/CheckOut"><button className="CheckOutButton CheckOutButtonHover">Checkout</button></Link>
            </div>
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
                        <button className="CartRemoveButton CartRemoveButtonHover" onClick={() => UpdateCartQuantity(item.id)}>Remove Item</button>
            </div>
        ))
            }
        </div>
    )
}

export default CartPage