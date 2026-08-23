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
import CategoryAdminPage from './Pages/CategoryAdminPage.tsx'
import "./Pages/CategoryAdminPage.css";
import "./Pages/DefaultCSS.css";
import "./App.css";


function App()
{
 
    const [jwtToken, setToken] = useState<string>("")

    return (
      
        < div >
        <div>
           <Link to="/" className="Home">
                   <h2>Home</h2>
                </Link> 
            </div>
            <Routes>
                <Route path="/" element={

                <div>
               
                    <h1 className="Title"> Food Shopping</h1>
                        <h2 className="Message">Buy Delicious Food here! Ordered to your location!</h2>
                        
                        <div className="Sections">
                            <Link to="/Categories" className="Link"><h2>View the Food</h2></Link>    
                
                
                    
                            <Link to="/Register" className="Link"><h2>Create An Account</h2></Link> 
            

                            <Link to="/login" className="Link"><h2>Log into Your Account</h2></Link> 
                        
                            <Link to="/Admin" className="Link"><h2>Admin</h2></Link> 
                        </div>
                 </div>
                    } />
                   
             
                <Route path="/Categories" element={<CategoryPage />} />
                <Route path="/login" element={<LoginPage setToken={setToken} />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Admin" element={<AdminPage />} />
                <Route path="/Users" element={<UserPage token={jwtToken} />} />
                <Route path="/Food" element={<FoodPage />} />
                <Route path="/FoodAdmin" element={<FoodAdminPage token={jwtToken} />} />
                <Route path="/CategoriesAdmin" element={<CategoryAdminPage token={jwtToken} /> } />
            
             
            </Routes>
        </div>
    ) 
   
  
}



export default App 

