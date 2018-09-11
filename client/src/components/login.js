import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      if (Object.keys(this.props.user).length > 0) {
        this.props.history.push("/forums");
      }
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  loginUser = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };
    this.props.loginUser(newUser, this.props.history);
    if (Object.keys(this.props.user).length === 0) {
      setTimeout(() => {
        this.setState({
          email: !this.state.errors.email ? this.state.email : "",
          password: !this.state.errors.password ? this.state.password : ""
        });
      }, 500);
    }
  };
  render() {
    return (
      <div className="loginLanding">
        <div id="loginBoxWrapper">
          <h1 className="registerTitle"> Login</h1>
          <form
            onSubmit={this.loginUser}
            autoComplete="off"
            className="form-group"
          >
            <label>Email</label>
            <input
              onChange={this.onChange}
              placeholder={this.state.errors.email}
              value={this.state.email}
              name="email"
              className="form-input"
            />

            <label>Password</label>
            <input
              type="password"
              onChange={this.onChange}
              placeholder={this.state.errors.password}
              name="password"
              value={this.state.password}
              className="form-input"
            />

            <div className="form-group-hor">
              <button className="form-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
