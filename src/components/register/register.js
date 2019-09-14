import React from "react";
import Spinner from "../spinner";
import {Redirect} from "react-router-dom";
import RegisterForm from "../register-form";

const Register = ({register, authData}) => {

    const {userId, token, userEmail, loading, error} = authData;

    if (loading) {
        return <Spinner/>
    }

    if (token) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h3>Register</h3>
            <RegisterForm register={register}/>
            {error && <div>{error.toString()}</div>}
        </div>
    )
}

export default Register