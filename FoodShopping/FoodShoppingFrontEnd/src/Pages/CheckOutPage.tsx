import { useState } from 'react'
import { orderFood } from '../Services/CheckOutService'
import './CategoryAdminPage.css'
import './CheckOutPage.css'

type CheckOutPageProps = {
    token: string | null,
    totalCartPriceProp: number | null
}
function CheckOutPage({ token, totalCartPriceProp }: CheckOutPageProps)
{
    const [message, setMessage] = useState<string>("")

    async function OrderFood()
    {
        const response = await orderFood(token)
        if (response)
            setMessage("Thank You For Shopping at FoodSite")

        else
            setMessage("Can Not Perform Transaction. Try Again")

    }

    return (
        <div>
            <h1 className="Title">Check Out</h1>
            {totalCartPriceProp &&
                <div className="OrderDiv">
                    <h2>Total Price: ${totalCartPriceProp}</h2>
                    <button className="OrderButton OrderButtonHover" onClick={OrderFood} >Confirm Order</button>
                </div>
            }
            {message && (
                <h2 className="Message">{message}</h2>
            )}
           
        </div>
    )

}

export default CheckOutPage