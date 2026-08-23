import { Route, Routes, Link } from "react-router-dom"
import "./CategoryAdminPage.css";
import "./AdminPage.css";

function AdminPage()
{ 
    return (
        <div>
        
            <Routes>
                <Route path="/" element={
                    <div>
                        <h1 className="Title">Admin Page</h1>
                    <div className="AdminSections">
          
                 
                            <h2 className="MarginTop40"><Link to="/Users" className="Link">Users</Link>  </h2>  
                            <h2 className="MarginTop40"> <Link to="/FoodAdmin" className="Link">Food</Link> </h2> 
                            <h2 className="MarginTop40"> <Link to="/CategoriesAdmin" className="Link">Categories</Link> </h2> 
                        </div>
                    </div>
                } />
       
            </Routes>
        </div>
    )
}

export default AdminPage