import React from "react"
import {Link} from "react-router-dom";

const Header = ({isAuthorized, email}) => {

    return (
        <div>
            <h3>{isAuthorized ? `Hello, ${email}`: 'Please log in to your account!'}</h3>
            <nav>
                <div><Link to="/">HOME</Link></div>
                { isAuthorized && <div><Link to="/images">Images</Link></div> }
                { isAuthorized && <div><Link to="/logoff">Logoff</Link></div> }
                { !isAuthorized && <div><Link to="/login">Login</Link></div> }
                { !isAuthorized && <div><Link to="/register">Register</Link></div>}
            </nav>
        </div>
    )
}

export default Header