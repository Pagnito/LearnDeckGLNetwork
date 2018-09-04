import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/add-post.css";
import axios from "axios";
import NotFound from "./not-found";
class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      description: "",
      text: "",
      errors: {}
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
  send = () => {
    const newPost = {
      topic: this.state.topic,
      description: this.state.description,
      text: this.state.text,
      avatar: this.props.user.avatar,
      userName: this.props.user.userName
    };

    axios
      .post("/api/posts/post", newPost)
      .then(() => {
        document.getElementById("flyBtn").classList.add("fly");
        setTimeout(() => {
          this.props.history.push("./forums");
        }, 1000);
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (Object.keys(this.props.user).length > 0) {
      return (
        <div className="addPostWrap">
          <div className="addPost">
            <form className="addPostForm">
              <label>Topic</label>
              <input
                className="myInput"
                onChange={this.onChange}
                value={this.state.topic}
                type="text"
                name="topic"
                placeholder={this.state.errors.topic}
              />

              <textarea
                className="myInput desc"
                onChange={this.onChange}
                value={this.state.description}
                type="text"
                name="description"
                placeholder={
                  Object.keys(this.state.errors).length
                    ? this.state.errors.description
                    : "Description"
                }
              />
              <textarea
                className="myInput text"
                onChange={this.onChange}
                value={this.state.text}
                type="text"
                name="text"
                placeholder={
                  Object.keys(this.state.errors).length
                    ? this.state.errors.text
                    : "Your concern"
                }
              />
              <i
                onClick={this.send}
                id="flyBtn"
                className="far fa-paper-plane"
              />
            </form>
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

export default withRouter(AddPost);
