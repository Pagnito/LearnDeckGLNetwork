import React, { Component } from "react";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    window.scroll(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors.errors });
    }
    if (prevProps.user !== this.props.user) {
      this.props.history.push("/forums");
    }
  }
  onSubmit = e => {
    this.setState({ errors: {} });
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    setTimeout(() => {
      this.setState({
        email: !this.state.errors.email ? this.state.email : "",
        userName: !this.state.errors.userName ? this.state.userName : "",
        password: !this.state.errors.password ? this.state.password : "",
        password2: !this.state.errors.password2 ? this.state.password2 : ""
      });
    }, 500);
  };
  render() {
    return (
      <div className="landing">
        <div id="loginBoxWrapper">
          <h1 className="registerTitle"> Register</h1>
          <form
            onSubmit={this.onSubmit}
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
            <label>User Name</label>
            <input
              onChange={this.onChange}
              placeholder={this.state.errors.userName}
              name="userName"
              value={this.state.userName}
              className="form-input"
            />
            <label>Password</label>
            <input
              onChange={this.onChange}
              placeholder={this.state.errors.password}
              name="password"
              value={this.state.password}
              className="form-input"
            />
            <label>Confirm Password</label>
            <input
              onChange={this.onChange}
              placeholder={this.state.errors.password2}
              name="password2"
              value={this.state.password2}
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

export default Landing;
