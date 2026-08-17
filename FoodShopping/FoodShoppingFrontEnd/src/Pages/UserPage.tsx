import { useState } from "react"
import getUsers, { getUser, deleteUser, editUserRoleRequest } from "../Services/UsersService"
import type { User } from "../TypeScripts/User"


type UserPageProps = {
    token: string
}

function UserPage({ token }: UserPageProps) {  

    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>("")
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [selectedUserRole, setSelectedUserRole] = useState<number | null>(null)


    async function GetUsers()
    {
        setIsEditingUser(false)
        setMessage("")
        setUser(null!)
        const data = await getUsers(token)
        setUsers(data)

    }

    async function GetUser(event: React.SubmitEvent<HTMLFormElement>)
    {
        setIsEditingUser(false)
        setMessage("")
        event.preventDefault()

        if (!id)
        {
            setMessage("User Not Found")
            return;
        }
           

        const data = await getUser(token, id)
        if (data)
            setUser(data)
        else
        {
            setMessage("User Not Found")
            setUser(null!)
        }
         
        setUsers([])
    }

    async function DeleteUser(user: User)
    {
        const foundUser = await deleteUser(token, user)
        setUsers([])
        setUser(null)
        setIsEditingUser(false)
        if (foundUser) 
            setMessage("User Deleted.")
        
        else 
            setMessage("Can not delete user.")
           
    }

    async function EditUser(user: User)
    {
        setUsers([])
        const data = await getUser(token, user.id)
        if (!data) return;
        setUser(data)
        setIsEditingUser(true)

    }

    async function EditSubmit(event: React.SubmitEvent<HTMLFormElement>, user: User)
    {
  
        event.preventDefault()
  
        console.log("User role is:", selectedUserRole)
        setUser(null!)
        setIsEditingUser(false)


        if (selectedUserRole !== null)
        {
            const canEdit = await editUserRoleRequest(token, user, selectedUserRole)
            if (canEdit)
                setMessage("User Role Updated")
        }
           
        else
            setMessage("Can Not Update User")

    } 

    return (
        <div>
            <h1>User Page</h1>
            <button onClick={GetUsers}>View Users</button>
            <form onSubmit={GetUser}>
                <input type="number" placeholder="Search ID" onChange={(event) => setId(Number(event.target.value))} />
            </form>  
            
            {message && <h2>{message}</h2>}
            {user &&(
            
                <p>ID: {user.id}
                    Username: {user.username}
                    User Role: {user.userRole}
                    <button onClick={() => EditUser(user)} >Edit</button>
                    <button onClick={() => DeleteUser(user)} >Delete</button></p>
            )}
            {isEditingUser && user && <div><h2> Edit User</h2>
                <form onSubmit={(event) => EditSubmit(event, user)
                    
                }>
                    <select defaultValue="" onChange={(event) => setSelectedUserRole(Number(event.target.value))}>
                        <option value="" disabled>Role</option>
                        <option value={1} >Member</option>
                        <option value={2} >Admin</option>
                    </select>
                    <input type="submit"/>
                </form> </div>
            }
            {
                users.map((user) => (
                    <div key={user.id}>
                        <p>ID: {user.id}
                            Username: {user.username}
                            User Role: {user.userRole}
                            <button onClick={() => EditUser(user)} >Edit</button>
                            <button onClick={() => DeleteUser(user)} >Delete</button></p>
                    </div>)) 
            }
        </div>
   
    )
}

export default UserPage