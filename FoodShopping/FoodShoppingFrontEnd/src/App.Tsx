//import type { Food } from './TypeScripts/Food.ts'
//import type { Category } from './TypeScripts/Category.ts'
import LoginPage from './Pages/LoginPage.tsx'
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import CategoryPage from './Pages/CategoryPage.tsx'
import RegisterPage from './Pages/RegisterPage.tsx'
import AdminPage from './Pages/AdminPage.tsx'
import UserPage from './Pages/UserPage.tsx'
import FoodPage from './Pages/FoodPage.tsx'
import FoodAdminPage from './Pages/FoodAdminPage.tsx'

function App()
{
  //  const [categories, setCategories] = useState<Category[]>([])
    const [jwtToken, setToken] = useState<string>("")

    return (
      
        < div >
            <Routes>
                <Route path="/" element={

                <div>
               
                    <h1> Food Shopping</h1>
                    <p>Buy Delicious Food here! Ordered to your location!</p>
                        <p></p>

                    <Link to="/Categories">View the Food!</Link>
                    
                
                    
                    <Link to="/Register">Create an Account</Link>
            

                        <Link to="/login">Log in to Your Account</Link>
                        <p></p>
                        <Link to="/Admin">Admin</Link>
                 </div>
                    }/>
                <Route path="/Categories" element={<CategoryPage />} />
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Admin" element={<AdminPage />} />
                <Route path="/Users" element={<UserPage token={jwtToken} />} />
                <Route path="/Food" element={<FoodPage />} />
                <Route path="/FoodAdmin" element={<FoodAdminPage token={jwtToken} />} />
            
             
            </Routes>
        </div>
    ) 
   
  
}



export default App 

