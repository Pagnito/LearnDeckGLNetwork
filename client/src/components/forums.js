import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/forums.css";
class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
    if (this.state.posts === null) {
      axios.get("/api/posts").then(res => {
        this.setState({ posts: res.data });
      });
    }
  }
  deletePost = id => {
    axios.delete(`/api/posts/deletePost/${id}`).then(res => {
      this.setState({ posts: res.data });
    });
  };
  renderPosts = () => {
    return this.state.posts.map((post, ind) => {
      const delBtn = this.props.user.id === post.userId ? " Delete" : "";
      return (
        <div key={ind} className="post">
          <div className="aboutPoster">
            <div className="forumPicWrap">
              <Link
                to={`/getUser/${post.userId}`}
                className="chatUserItem"
                key={ind}
              >
                <img className="forumPic" src={post.avatar} />
              </Link>
            </div>
            <div className="forumUserName">{post.userName}</div>
          </div>
          <div className="postDescWrap">
            <Link to={`/post/${post._id}`} className="postTopic">
              {post.topic}
            </Link>
            <Link to={`/post/${post._id}`} className="postDesc">
              {post.description}
            </Link>
            <div className="postDate">
              {moment(post.date).format("MMMM Do YYYY, h:mm")}
              <div
                onClick={this.deletePost.bind(this, post._id)}
                className="delBtn"
              >
                {delBtn}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    if (this.state.posts == null) {
      return (
        <div className="spinnerWrap">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1" />
            <div className="sk-cube sk-cube2" />
            <div className="sk-cube sk-cube3" />
            <div className="sk-cube sk-cube4" />
            <div className="sk-cube sk-cube5" />
            <div className="sk-cube sk-cube6" />
            <div className="sk-cube sk-cube7" />
            <div className="sk-cube sk-cube8" />
            <div className="sk-cube sk-cube9" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="forumsWrap">
          <div className="forumTopics">
            <div className="addTopic">
              <Link to="/addPost">
                <i className="fas fa-plus" />
              </Link>
            </div>
            {this.renderPosts()}
          </div>
        </div>
      );
    }
  }
}

export default Forums;
