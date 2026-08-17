import type { User } from "../TypeScripts/User";

async function getUsers(token: string): Promise<User[]>
{ 
    const response = await fetch('http://localhost:5267/api/users', {
        headers: { 'Authorization': `Bearer ${token}`}
    })

    if (!response.ok)
    {
        console.log("Not allowed access")
        return [];
    }
    const data = await response.json()
    console.log(data)
    return data

}

export default getUsers

export async function getUser(token: string, id: number): Promise<User | null>
{ 
    const response = await fetch(`http://localhost:5267/api/users/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })

    if (!response.ok) {
        console.log("Not allowed access")
        return null;
    }
    const data = await response.json()
    console.log(data)
    return data
}

export async function deleteUser(token: string, user: User) : Promise<boolean>
{ 
    const response = await fetch(`http://localhost:5267/api/users/${user.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`}
    })

    return response.ok
}

export async function editUserRequest(token: string, user: User, password: string, username?: string): Promise<boolean>
{ 
  
    const response = await fetch(`http://localhost:5267/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'oldPassword': password
        })
    })

    return response.ok
}

export async function editUserRoleRequest(token: string, user: User, userRole: number): Promise<boolean>
{
    const response = await fetch(`http://localhost:5267/api/users/role/${user.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'role': userRole
        })
    })

    return response.ok
}
