import { Link } from 'react-router-dom'
import GetCategories from '../Services/CategoryService'
import type { Category } from '../TypeScripts/Category'
import { useEffect, useState } from 'react'


function CategoryPage() {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        async function getCategories() {

            const data = await GetCategories()

            setCategories(data)
        }
        getCategories()
    }, [])

    

    return (
        < div >
        <h1>Category Page</h1>
        <p>Categories</p>
        <p></p>
            {
                categories.map((category) => (
                    <Link to="/Food" key={category.id}>{category.name}</Link>
                ))
            }
            <p></p>
 
    </div >
    )
    
}

export default CategoryPage 

