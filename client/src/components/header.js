import React, { Component } from "react";
import "../styles/simple-nav.css";
import { Link } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  // eslint-disable-line react/prefer-stateless-function
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ user: { ...this.props.user } });
    }
  }
  renderHeader() {
    if (Object.keys(this.state.user).length > 0) {
      return (
        <div className="logged-header">
          <div className="logged-logo-stns bg-stretch-5 hor-left vert-center logo-wrapper">
            <div className="logged-logo">
              <Link to="/">
                Learn<span className="logoStyle">DeckGL</span>
              </Link>
            </div>
          </div>
          <div className="align-vert l-nav-btn-stns hor-center bg-stretch-5">
            <div className="userInfoo hor-right vert-center">
              <div className="userName">{this.state.user.userName}</div>
              <img
                alt="avatar"
                className="proPic"
                src={this.state.user.avatar}
              />
            </div>
            <div className="logged-nav logged-nav-btns vert-bot hor-right">
              <ul>
                <li>
                  <Link to="/chatRooms">Chat</Link>
                </li>
                <li>
                  <Link to="/account">Account</Link>
                </li>
                <li>
                  <Link to="/forums">Forums</Link>
                </li>
                <li>
                  <Link onClick={this.props.logout} to="/">
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-1 fixed">
          <div className="logo-stns vert-center hor-left bg-stretch-7">
            <div className="logo">
              Learn<span className="logoStyle">DeckGL</span>
            </div>
          </div>
          <div className="nav-btn-stns bg-stretch-3 ">
            <div className="nav-btns hor-center vert-bot">
              <ul>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
                <li>
                  <Link to="/">Register</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div>{this.renderHeader()}</div>;
  }
}

export default Header;
