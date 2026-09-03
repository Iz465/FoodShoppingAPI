
import LoginPage from './Pages/LoginPage.tsx'
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import CategoryPage from './Pages/CategoryPage.tsx'
import RegisterPage from './Pages/RegisterPage.tsx'
import AdminPage from './Pages/AdminPage.tsx'
import FoodPage from './Pages/FoodPage.tsx'
import FoodAdminPage from './Pages/FoodAdminPage.tsx'
import CategoryAdminPage from './Pages/CategoryAdminPage.tsx'
import "./Pages/DefaultCSS.css";
import "./App.css";
import HomePage from './Pages/HomePage.tsx'
import AddFoodPage from './Pages/AddFoodPage.tsx'
import type { Food } from './TypeScripts/Food.ts'
import CartPage from './Pages/CartPage.tsx'
import CheckOutPage from './Pages/CheckOutPage.tsx'
import UsersAdminPage from './Pages/UsersAdminPage.tsx'
import UsersPage from './Pages/UsersPage.tsx'



function App()
{
 
    const [jwtToken, setToken] = useState<string>("")
    const [foodCategory, setFoodCategory] = useState<number | null>(null)
    const [foodRequest, setFoodRequest] = useState<Food | null>(null) 
    const [cartQuantity, setCartQuantity] = useState<number | null>(null)
    const [totalCartPrice, setTotalCartPrice] = useState<number | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function LogOut()
    {
        console.log("Logging out of Gielinor")
        setToken("")
        setIsLoggedIn(false)
    }

    return (

       
        < div >
            <div className="AppDiv">
           <Link to="/" className="Home">
                   <h2>Home</h2>
                </Link>
                <div className="CartandUserContainer">
                
                        {isLoggedIn &&
                        <div>
                            <Link to="/Users"> <img src="https://static.vecteezy.com/system/resources/thumbnails/082/502/139/small_2x/simple-black-silhouette-humanoid-figure-shape-icon-vector.jpg"
                                className="CartImage" /></Link>
                                  <Link to="/" onClick={LogOut} > <h2>Log Out</h2> </Link>
                                  </div>
                        }
                    <div>
                   
                        <Link to="/CartPage"><img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/all-3/shopping-cart-9xhllmo2cb79djc9j7b5kb.png/shopping-cart-pe974q2wd8bzu5cueg3qr.png?_a=DATAiZAAZAA0"
                            className="CartImage" /></Link>
                   
                    <p className="CartNumber">{cartQuantity}</p>
                    </div>
                </div>
            </div>
            <Routes>
               
                   
                <Route path="/" element={<HomePage token={jwtToken} isLoggedInProp={isLoggedIn} />} />
                <Route path="/Categories" element={<CategoryPage setCategory={setFoodCategory} />} />
                <Route path="/login" element={<LoginPage setToken={setToken} setCartQuantityProp={setCartQuantity} setIsLoggedInProp={setIsLoggedIn} />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Admin" element={<AdminPage />} />
                <Route path="/UsersAdmin" element={<UsersAdminPage token={jwtToken} />} />
                <Route path="/Food" element={<FoodPage category={foodCategory} setFoodRequestProp = { setFoodRequest } />} />
                <Route path="/FoodAdmin" element={<FoodAdminPage token={jwtToken} />} />
                <Route path="/CategoriesAdmin" element={<CategoryAdminPage token={jwtToken} />} />
                <Route path="/AddFood" element={<AddFoodPage food={foodRequest} token={jwtToken} setCartQuantityProp={setCartQuantity} />} />
                <Route path="/CartPage" element={<CartPage token={jwtToken} setCartQuantityProp={setCartQuantity}
                    totalCartPriceProp={totalCartPrice} setTotalCartPriceProp={setTotalCartPrice} />} />
                <Route path="/CheckOut" element={<CheckOutPage token={jwtToken} totalCartPriceProp={totalCartPrice}
                    setCartQuantityProp={setCartQuantity} />} />
                <Route path="/Users" element={<UsersPage token={jwtToken} />} />
            
             
            </Routes>
        </div>
    ) 
   
  
}



export default App 

