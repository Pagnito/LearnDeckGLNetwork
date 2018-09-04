import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/forums.css";
class Forums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
    if (this.state.posts.length === 0) {
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
              <img className="forumPic" src={post.avatar} />
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

export default Forums;
