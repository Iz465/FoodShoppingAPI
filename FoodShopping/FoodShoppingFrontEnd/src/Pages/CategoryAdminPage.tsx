import { useState } from "react"
import { createCategory, deleteCategory, editCategory, getCategories } from "../Services/CategoryAdminService"
import type { Category } from "../TypeScripts/Category"

type CategoryAdminPageProps = {
    token: string
}
function CategoryAdminPage({ token }: CategoryAdminPageProps)
{ 
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category | null>(null)
    const [message, setMessage] = useState<string>("")
    const [isCreateCategory, setIsCreateCategory] = useState(false)
    const [isEditCategory, setIsEditCategory] = useState(false)
    const [name, setName] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    async function GetCategories()
    {
        setIsCreateCategory(false)
        setIsEditCategory(false)
        const data = await getCategories()
        setCategories(data)
    }

    async function DeleteCategory(category: Category)
    { 
        
        const data = await deleteCategory(token, category.id)

        if (data)
        { 
            setMessage("Category Deleted")
            setCategories([])
        }
     

        else
            setMessage("Unable to Delete Category")

    }

    async function CreateCategory()
    {
        setIsCreateCategory(true)
        setCategories([])
        setMessage("Create Category")
    }

    async function SubmitCreateCategory(event: React.SubmitEvent<HTMLFormElement>)
    { 
        event.preventDefault()

        const data = await createCategory(token, name!, imageUrl!)

        if (data)
        {
            setMessage("Category Created")
            setIsCreateCategory(false)
        }
            
        
        else
            setMessage("Can not create category")
    }

    async function EditCategory(category: Category)
    {
        setCategories([])
        setCategory(category)
        setIsEditCategory(true)
        setMessage(`Edit ${category.name} Category`)
    }

    async function SubmitEditCategory(event: React.SubmitEvent<HTMLFormElement>)
    { 
        event.preventDefault()
        if (!category)
            return

        const data = await editCategory(token, category.id, name, imageUrl)

        if (data)
        {
            setMessage("Category Has Been Updated")
            setIsEditCategory(false)
        }

        else
            setMessage("Unable to Update Category")
      
    }

    return (
        <div>
            <h1>Categories</h1>
            {message && (
                <h2>{message}</h2>
            )}
            <button onClick={GetCategories}>View Categories</button>
            <button onClick={CreateCategory} >Create Category</button>
            {isCreateCategory && (
                <div>
                    <form onSubmit={(event) => SubmitCreateCategory(event)} >
                        <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value) } />
                        <input type="text" placeholder="Image URL" onChange={(event) => setImageUrl(event.target.value)} />
                        <input type="submit" placeholder="Submit" />
                    </form>
                </div>
            )}
            {isEditCategory && (
                <div>
                    <form onSubmit={(event) => SubmitEditCategory(event)} >
                        <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
                        <input type="text" placeholder="Image URL" onChange={(event) => setImageUrl(event.target.value)} />
                        <input type="submit" placeholder="Submit" />
                    </form>
                </div>
            )}
            {categories.map((category) => (
                <div key={category.id}>
                    <p>ID: {category.id}
                       Name: {category.name}
                        Image: {category.image}
                        <button onClick={() => EditCategory(category)} >Edit</button>
                        <button onClick={() => DeleteCategory(category)} >Delete</button>
                    </p>
                </div>
            ))
            }
        </div>

    )
}

export default CategoryAdminPage 