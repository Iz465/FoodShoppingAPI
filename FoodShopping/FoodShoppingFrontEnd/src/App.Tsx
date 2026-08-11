import type { Food } from './TypeScripts/Food.ts'
import type { Category } from './TypeScripts/Category.ts'
import LoginPage from './Pages/LoginPage.tsx'
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import CategoryPage from './Pages/CategoryPage.tsx'
import RegisterPage from './Pages/RegisterPage.tsx'

function App()
{
    const [categories, setCategories] = useState<Category[]>([])
    const [jwtToken, setToken] = useState<string>("")

    async function getCategories() {
        const response = await fetch('http://localhost:5267/api/category')

        const data = await response.json()
        setCategories(data)

        console.log(data)
    }

  
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
                 </div>
                    }/>
                <Route path="/Categories" element={<CategoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage/> }/>
            </Routes>
        </div>
    ) 
   
  
}



export default App 

