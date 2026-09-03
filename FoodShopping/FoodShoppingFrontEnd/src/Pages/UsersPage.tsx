import { editUserProfile } from '../Services/UsersService'
import type { User } from '../TypeScripts/User'
import './CategoryAdminPage.css'
import './UsersPage.css'
import React, { useEffect, useState } from 'react'

type UsersPageProps = {
    token: string
}

function UsersPage({token}: UsersPageProps)
{
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)



    useEffect(() => {
      
        GetUser()

    })

    async function GetUser() {
        const response = await fetch('http://localhost:5267/api/users/profile', {
            headers: { 'Authorization': `bearer ${token}` }
        })

        if (response.ok) {
            const data = await response.json()
            setUser(data)
        }
    }

    async function EditUserProfile() {
        setMessage(null)
        setIsEditing(true)
    }

    async function RevertEdits()
    {
        setIsEditing(false)
    }

    async function SubmitEdits(event: React.SubmitEvent<HTMLFormElement>)
    {
        event.preventDefault()

        const isEdited = await editUserProfile(token, username)

        if (isEdited)
        {
            setMessage("Profile Updated")
            setIsEditing(false)
            GetUser()
        }
            
        else
            setMessage("Can Not Update Profile")
    }

    return (
        <div>
            <h1>User Profile</h1>
            <h2 className="Title"><button className="AdminCategoryButton FlashGrey" onClick={EditUserProfile} >Edit Profile</button></h2>
            {message && (
                <h2 className="Message">{message}</h2>
            )}
            {!isEditing && (
                <div className="UserContainer">
            
                
                
                <div className="UserSection">
                <h2>Username: </h2>
                {user && (<h2>{user.username}</h2>)}
                </div>

                <div className="UserSection">
                <h2>User Role: </h2>
                {user && (<h2>{user.userRole}</h2>)}
                </div>


                <div className="UserSection">
                <h2>Email: </h2>
                <h2>Placeholder</h2>
            </div>
                <div className="UserSection">
                <h2>Phone: </h2>
                        <h2>Placeholder</h2>
            </div>
                <div className="UserSection">
                <h2>Address: </h2>
                <h2>Placeholder</h2>
                    </div>
                   
                </div>
            )}

            {isEditing && (
                <div className="UserContainer">
                    <form onSubmit={(event) => SubmitEdits(event) }>
                 
                    <div className="UserSection">
                        <h2>Username: </h2>
                            <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="UserSection">
                        <h2>Email: </h2>
                         <input type="text" placeholder="Email" />
                    </div>
                    <div className="UserSection">
                        <h2>Phone: </h2>
                         <input type="number" placeholder="Phone" />
                    </div>
                    <div className="UserSection">
                        <h2>Address: </h2>
                         <input type="text" placeholder="Address" />
                        </div>
                        <div className="FormButtons">
                            <button className="AdminCategoryButton RevertButton RevertHover" onClick={RevertEdits} ><h2>Revert</h2></button>
                            <input type="submit" className="AdminCategoryButton SubmitForm SubmitHover" placeholder="Confirm"/>
                        </div>
                    </form>
                 
                </div>
            
            )}
        </div>
    )
}

export default UsersPage