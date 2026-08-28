import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./CategoryAdminPage.css";
import "./DefaultCSS.css";

type HomePageProps = {
    token: string
}

function HomePage({ token }: HomePageProps)
{ 
    const [isAdmin, setIsAdmin] = useState(true)

    useEffect(() => {
        async function CheckAuthentication() {
            const response = await fetch('http://localhost:5267/api/users/homePage', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok)
                setIsAdmin(true);
            else
                setIsAdmin(false);
        }

        CheckAuthentication();
    }, [token]);

    return (

        <div>

            <h1 className="Title"> Food Shopping</h1>
            <h2 className="Message">Buy Delicious Food here! Ordered to your location!</h2>

            <div className="Sections">
                <Link to="/Categories" className="Link"><h2>View the Food</h2></Link>



                <Link to="/Register" className="Link"><h2>Create An Account</h2></Link>


                <Link to="/login" className="Link"><h2>Log into Your Account</h2></Link>

                {isAdmin && (
                    <Link to="/Admin" className="Link"><h2>Admin</h2></Link>
                )}

            </div>
        </div>
    )
}

export default HomePage