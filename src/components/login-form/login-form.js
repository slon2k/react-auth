import React from "react";

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit", this.state);
        this.props.login({email: this.state.email, password: this.state.password});
    }

    handleInput = (key, value) => {
        this.setState({[key]: value} )
    }

    render() {
        const {email, password} = this.state;
        return(
            <form>
                <label>
                    <strong>Email:</strong><br/>
                    <input type="email"
                           name="email"
                           value={email}
                           onChange={(event) => this.handleInput('email', event.target.value)}
                    />
                </label>
                <br/>
                <label>
                    <strong>Password:</strong><br/>
                    <input type="password"
                           name="password"
                           value={password}
                           onChange={(event) => this.handleInput('password', event.target.value)}
                    />
                </label>
                <br/>
                <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}