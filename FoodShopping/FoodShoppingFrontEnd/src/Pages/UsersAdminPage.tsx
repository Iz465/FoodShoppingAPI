import { useState } from "react"
import getUsers, { getUser, deleteUser, editUserRoleRequest } from "../Services/UsersService"
import type { User } from "../TypeScripts/User"


type UserPageProps = {
    token: string
}

function UsersAdminPage({ token }: UserPageProps) {  

    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [id, setId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>("")
    const [isfoodSearch, setIsfoodSearch] = useState(false)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [selectedUserRole, setSelectedUserRole] = useState<number | null>(null)


    async function GetUsers()
    {
        setIsEditingUser(false)
        setIsfoodSearch(false)
        setMessage("")
        setUser(null!)
        const data = await getUsers(token)
        setUsers(data)

    }

    async function GetUser(event: React.SubmitEvent<HTMLFormElement>)
    {
        setIsEditingUser(false)
        setIsfoodSearch(true)
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
        setIsfoodSearch(false)
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
            <h1 className="Title">User Page</h1>
            <form onSubmit={GetUser}>
                <input className="Input" type="number" placeholder="Search ID" onChange={(event) => setId(Number(event.target.value))} />
            </form>  
            <button className="AdminCategoryButton FlashGrey MarginUpDown20" onClick={GetUsers}>View Users</button>
          
            
            {message && <h2 className="Message">{message}</h2>}
            {user && isfoodSearch &&(
            <div className="AdminUserItems"> 
                    <p>{user.id}</p>
                    <p>{user.username}</p>
                    <p>{user.userRole}</p>
                    <div>
                    <button className="AdminCategoryButton EditButton FlashGreen" onClick={() => EditUser(user)}>Edit</button>
                        <button className="AdminCategoryButton DeleteButton FlashRed"  onClick={() => DeleteUser(user)} >Delete</button>
                    </div>
                </div>
            )}
            {isEditingUser && user && <div><h2> Edit User</h2>
                <form onSubmit={(event) => EditSubmit(event, user)
                    
                }> 
                    <select className="Input" defaultValue="" onChange={(event) => setSelectedUserRole(Number(event.target.value))}>
                        <option value="" disabled>Role</option>
                        <option value={1} >Member</option>
                        <option value={2} >Admin</option>
                    </select>
                    <input className="Input" type="submit"/>
                </form> </div>
            }
            {
                users.map((user) => (
                    <div className="AdminUserItems" key={user.id}>
                        <p> {user.id} </p>
                        <p> {user.username}</p>
                        <p> {user.userRole}</p>
                        <div>
                        <button className="AdminCategoryButton EditButton FlashGreen" onClick={() => EditUser(user)} >Edit</button>
                            <button className="AdminCategoryButton DeleteButton FlashRed" onClick={() => DeleteUser(user)} >Delete</button>
                        </div>
                    </div>)) 
            }
        </div>
   
    )
}

export default UsersAdminPage