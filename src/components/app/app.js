import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import * as authService from "../../services/auth-service"
import Header from "../header";
import Main from "../main";
import Login from "../login";

export default class App extends React.Component {

    state = {
        Auth: {
            userId: null,
            token: null,
            userEmail: 'test@test',
            loading: false,
            error: null,
        }
    }

    setAuthData = ({userId, token, userEmail}) => {
        const newAuthData = {
            userId, token, userEmail, loading: false, error: null,
        }
        this.setState({Auth: newAuthData})
    }

    setAuthLoading = () => {
        const newAuthData = {...this.state.Auth, loading: true, error: null};
        this.setState({Auth: newAuthData})
    }

    setAuthError = (errorMessage) => {
        const newAuthData = {...this.state.Auth, loading: false, error: errorMessage};
        this.setState({Auth: newAuthData})
    }

    login = (credentials) => {
        this.setAuthLoading();
        authService.signIn(credentials)
            .then(result => console.log(result))
            .catch(error => console.log(error))
    }

    isAuthorized = this.state.Auth.token !== null;

    render() {
        const {userEmail} = this.state.Auth;

        return(
            <Router>
                <div className='container'>
                    <Header isAuthorized={this.isAuthorized} email={userEmail}/>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        )
    }

}