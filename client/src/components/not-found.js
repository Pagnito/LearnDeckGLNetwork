import React, { Component } from "react";
import "../styles/not-found.css";
export class NotFound extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="notFound">
        You are either not logged in or this page doesnt exist
      </div>
    );
  }
}

export default NotFound;
