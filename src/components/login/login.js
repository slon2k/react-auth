import React from "react";
import LoginForm from "../login-form";
import Spinner from "../spinner";
import {Redirect} from "react-router-dom";

const Login = ({login, authData}) => {

    const {userId, token, userEmail, loading, error} = authData;

    if (loading) {
        return <Spinner/>
    }

    if (token) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3>Login</h3>
            <LoginForm login={login}/>
            {error && <div>{error.toString()}</div>}
        </div>
    )
}

export default Login