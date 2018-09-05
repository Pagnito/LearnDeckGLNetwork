import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ChatRoom from "./components/chatRoom";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/landing";
import Header from "./components/header";
import Login from "./components/login";
import Forums from "./components/forums";
import ForumPost from "./components/forum-post";
import AddPost from "./components/add-post";
import Account from "./components/account";
import ViewUser from "./components/viewUser";
import About from "./components/about";
import { setAuthToken } from "./utils/set-token";
import jwt_decode from "jwt-decode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      registeredUser: {},
      errors: {}
    };
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setAuthToken(false);
      }
    }
  }
  changePic = picUrl => {
    axios.post("/api/users/updatePic", picUrl).then(res => {
      this.setState({ user: res.data });
    });
  };
  registerUser = (newUser, history) => {
    axios
      .post("/api/users/register", newUser)
      .then(res => {
        this.setState({ registeredUser: res.data });
        const regstrdUsr = {
          email: newUser.email,
          password: newUser.password
        };
        axios
          .post("/api/users/login", regstrdUsr)
          .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            this.setState({ user: decoded });
          })
          .catch(err => {
            this.setState({
              errors: err.response.data
            });
          });
      })
      .catch(err => {
        if (err) {
          this.setState({
            errors: err.response.data
          });
        }
      });
  };
  loginUser = (user, history) => {
    axios
      .post("/api/users/login", user)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        this.setState({ user: decoded });
      })
      .catch(err => {
        if (err) {
          this.setState({ errors: err.response.data });
        }
      });
  };
  logoutUser = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setState({ user: {} });
    this.props.history.push("/");
  };
  getCurrent = () => {
    axios.get("/api/users/current").then(res => {
      this.setState({ user: res.data });
    });
  };
  componentDidMount() {
    this.getCurrent();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header user={this.state.user} logout={this.logoutUser} />
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                user={this.state.user}
                registerUser={this.registerUser}
                errors={this.state.errors}
              />
            )}
          />
          <Route
            exact
            path="/forums"
            render={props => <Forums {...props} user={this.state.user} />}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/getUser/:id" component={ViewUser} />
          <Route
            exact
            path="/account"
            render={props => (
              <Account
                {...props}
                changePic={this.changePic}
                user={this.state.user}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                {...props}
                loginUser={this.loginUser}
                user={this.state.user}
                errors={this.state.errors}
              />
            )}
          />
          <Route
            exact
            path="/chatRooms"
            render={props => <ChatRoom {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/post/:id"
            render={props => <ForumPost {...props} user={this.state.user} />}
          />
          <Route
            exact
            path="/addPost"
            render={props => <AddPost {...props} user={this.state.user} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
