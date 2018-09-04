import React, { Component } from "react";
import "../styles/account.css";
import NotFound from "./not-found";
class Account extends Component {
  // eslint-disable-line react/prefer-stateless-function
  renderRepos = () => {};
  render() {
    if (Object.keys(this.props.user).length > 0) {
      return (
        <div className="accountWrap">
          <div className="accountLetter">
            <div className="accountHeader">
              <div className="accountImg">
                <img className="accountAvatar" src={this.props.user.avatar} />
              </div>
              <div className="accountUsername">{this.props.user.userName}</div>
              <div className="addRepoBtn">Add Repo</div>
            </div>
            <div className="Repos" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NotFound />
        </div>
      );
    }
  }
}

export default Account;
