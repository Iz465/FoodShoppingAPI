import { useState } from "react"
import getUsers, { getUser } from "../Services/UsersService"
import type { User } from "../TypeScripts/User"

type UserPageProps = {
    token: string
}

function UserPage({ token }: UserPageProps) {  //   const [categories, setCategories] = useState<Category[]>([])

    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User>()
    const [id, setId] = useState<number>(0)

    async function GetUsers()
    {
        const data = await getUsers(token)
        setUsers(data)

    }

    async function GetUser()
    { 
        event?.preventDefault()
        const data = await getUser(token, id)
        setUser(data)
        setUsers([])
    }

    async function DeleteUser()
    {

    }

    async function EditUser() {

    }

    return (
        <div>
            <h1>User Page</h1>
            <button onClick={GetUsers}>View Users</button>
            <form onSubmit={GetUser}>
                <input type="number" placeholder="Search ID" onChange={(event) => setId(Number(event.target.value))} />
            </form>  
            {user &&(
            
                <p>Id: {user.id}
                    Username: {user.username}
                    User Role: {user.userRole}
                    <button onClick={EditUser} >Edit</button>
                    <button onClick={DeleteUser} >Delete</button></p>
            )}
            {
                users.map((user) => (
                    <div key={user.id}>
                        <p>Id: {user.id}
                            Username: {user.username}
                            User Role: {user.userRole}
                            <button onClick={EditUser} >Edit</button>
                            <button onClick={DeleteUser} >Delete</button></p>
                    </div>))
            }
        </div>
   
    )
}

export default UserPage