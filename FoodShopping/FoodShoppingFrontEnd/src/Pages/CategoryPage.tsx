import { Link } from 'react-router-dom'
import GetCategories from '../Services/CategoryService'
import type { Category } from '../TypeScripts/Category'
import React, { useEffect, useState, type SetStateAction, type Dispatch } from 'react'
import "./CategoryPage.css";

type CategoryPageProps = {
    setCategory: Dispatch<SetStateAction<number | null>>
}
function CategoryPage({setCategory}: CategoryPageProps) {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        async function getCategories() {

            const data = await GetCategories()

            setCategories(data)
        }
        getCategories()
    }, [])

    async function TestClick(id: number) { 
        setCategory(id);
    }

    return (
        < div >
        <h1 className= "Title">Food Categories</h1>
       
   
            
 
            <div className="CategoryLayout">
                        {
                    categories.map((category) => (
                        <div className="IndividualCategoryLayout">

                            <h2>{category.name}</h2>
                            <Link to="/Food"> <img className="CategoryImage ImageHover" src={category.imageUrl} onClick={() => TestClick(category.id)} /> </Link>
                        </div>
                            ))}
                          
                    </div>
            
        
 
    </div >
    )
    
}

export default CategoryPage 

