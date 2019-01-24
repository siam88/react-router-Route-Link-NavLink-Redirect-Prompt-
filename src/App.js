import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Prompt
} from "react-router-dom";

const User = params => {
  return <h1>welcome user {params.username}</h1>;
};
class App extends Component {
  state = {
    loggedIn: false
  };
  loginHandle = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  };
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/" exact activeStyle={{ color: "green" }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" exact activeStyle={{ color: "green" }}>
                about
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/siam" exact activeStyle={{ color: "green" }}>
                about siam
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/shipa" exact activeStyle={{ color: "green" }}>
                about shipa
              </NavLink>
            </li>
          </ul>

          <Prompt
            when={!this.state.loggedIn}
            message={location => {
              return location.pathname.startsWith("/user")
                ? "are you sure ?"
                : true;
            }}
          />
          <input
            type="button"
            value={this.state.loggedIn ? " log out" : "log in"}
            onClick={this.loginHandle.bind(this)}
          />
          <Route
            exact
            strict
            path="/"
            render={props => {
              return <h2>welcome router</h2>;
            }}
          />
          <Route
            exact
            strict
            path="/about"
            render={props => {
              return <h2>about router</h2>;
            }}
          />
          <Route
            exact
            strict
            path="/user/:username"
            render={({ match }) =>
              this.state.loggedIn ? (
                <User username={match.params.username} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;
