import { Route, Routes, Link } from "react-router-dom"


function AdminPage()
{ 
    return (
        <div>
        
            <Routes>
                <Route path="/" element={
                <div>
          
                    <h1>Admin Page</h1>
                    <Link to="/Users">Users</Link>    
                    <Link to="/FoodAdmin">Food</Link>
                    <Link to="/CategoriesAdmin">Categories</Link>
                 </div>
                } />
       
            </Routes>
        </div>
    )
}

export default AdminPage