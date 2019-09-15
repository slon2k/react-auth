import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import * as authService from "../../services/auth-service"
import Header from "../header";
import Main from "../main";
import Login from "../login";
import Register from "../register";

export default class App extends React.Component {

    initialAuthData = {
        userId: null,
        token: null,
        userEmail: null,
        loading: false,
        error: null,
    }

    state = {
        Auth: this.initialAuthData
    }

    setAuthData = ({userId, token, userEmail}) => {
        const newAuthData = {
            userId, token, userEmail, loading: false, error: null,
        };
        this.setState({Auth: newAuthData});
        console.log(this.state);
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
            .then(result => {
                console.log(result);
                const {email, idToken, localId} = result;
                this.setAuthData({userEmail: email, token: idToken, userId: localId});
                localStorage.setItem('userEmail', email);
                localStorage.setItem('token', idToken);
                localStorage.setItem('userId', localId);
            })
            .catch(error => {
                console.log(error);
                this.setAuthError(error);
            })
    }

    register = (credentials) => {
        this.setAuthLoading();
        authService.signUp(credentials)
            .then(result => {
                console.log(result);
                const {email, idToken, localId} = result;
                this.setAuthData({userEmail: email, token: idToken, userId: localId});
            })
            .catch(error => {
                console.log(error);
                this.setAuthError(error);
            })
    }

    logoff = () => {
        localStorage.setItem('userEmail', '');
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        this.setState({Auth: this.initialAuthData});
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const userId = localStorage.getItem('userId');
        if (token && token.trim().length !== 0) {
            const newAuthData = {
                userId, token, userEmail, loading: false, error: null,
            };
            this.setState({Auth: newAuthData});
        }
    }

    render() {
        const {userEmail, token} = this.state.Auth;

        return(
            <Router>
                <div className='container'>
                    <Header isAuthorized={token !== null} email={userEmail}/>
                    <Switch>
                        <Route exact path="/login"
                               render={() => <Login login={this.login} authData={this.state.Auth}/>}
                        />
                        <Route exact path="/register"
                               render={() => <Register register={this.register} authData={this.state.Auth}/>}
                        />
                        <Route exact path="/logoff"
                               render={() => {
                                   this.logoff();
                                   return <Redirect to="/" />
                                 }
                               }
                        />
                        <Route exact path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        )
    }
}