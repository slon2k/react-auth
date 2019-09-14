import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "../header";
import Main from "../main";
import Login from "../login";

export default class App extends React.Component {

    state = {
        Auth: {
            userId: null,
            token: null,
            email: null
        }
    }

    render() {
        return(
            <Router>
                <div>
                    <h2>App</h2>
                    <Header/>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/" component={Main} />
                    </Switch>
                </div>
            </Router>
        )
    }

}