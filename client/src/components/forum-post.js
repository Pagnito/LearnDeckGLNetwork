import React, { Component } from "react";
import "../styles/forum-post.css";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
class ForumPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      user: {},
      commentText: "",
      errors: {}
    };
  }
  getPost = id => {
    axios.get(`/api/posts/post/${id}`).then(res => {
      this.setState({ post: res.data });
    });
  };
  deleteComment = id => {
    axios
      .delete(`/api/posts/comment/${this.state.post._id}/${id}`)
      .then(res => {
        this.setState({ post: res.data });
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addComment = () => {
    const newComment = {
      text: this.state.commentText,
      avatar: this.props.user.avatar,
      userName: this.props.user.userName
    };
    axios
      .post(`/api/posts/comment/${this.state.post._id}`, newComment)
      .then(res => {
        this.setState({
          post: res.data,
          commentText: ""
        });
      })
      .catch(err =>
        this.setState({
          errors: err.response.data,
          commentText: ""
        })
      );
  };
  renderComments = () => {
    if (Object.keys(this.state.post).length > 0) {
      return this.state.post.comments.map((comment, ind) => {
        const deleteBtn =
          this.props.user.id === this.state.post.userId ? "Delete" : "";
        return (
          <div key={ind} className="commentWrap">
            <div className="aboutCommentor">
              <Link
                to={`/getUser/${comment.userId}`}
                className="chatUserItem"
                key={ind}
              >
                <img className="commentAvatar" src={comment.avatar} />
              </Link>
              <div className="commentUsername">{comment.userName}</div>
              <div className="commentDate">
                {moment(comment.date).format("lll")}
              </div>
            </div>
            <div className="commentText">{comment.text}</div>
            <div className="trashCommentWrap">
              <span
                onClick={this.deleteComment.bind(this, comment._id)}
                className="trashComment"
              >
                {deleteBtn}
              </span>
            </div>
          </div>
        );
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (this.state.user !== prevProps.user) {
      this.setState({ user: this.props.user });
    }
    if (this.state.errors == "Unauthorized") {
      this.setState({
        errors: {
          text: "You must be logged in to participate"
        }
      });
    }
  }
  componentDidMount() {
    window.scroll(0, 0);

    if (Object.keys(this.state.post).length === 0) {
      if (this.props.match.params.id) {
        this.getPost(this.props.match.params.id);
      }
    }
  }

  render() {
    return (
      <div className="forumPostWrap">
        <div className="forumPost">
          <div className="forumHeader">
            <div className="forumTitle">{this.state.post.topic}</div>
            <div className="forumDate">
              <div className="forumPoster">By {this.state.post.userName}</div>
              {moment(this.state.post.date).format("MMMM Do YYYY, h:mm")}
            </div>
          </div>
          <div className="forumContent">{this.state.post.text}</div>
          <div className="comments">{this.renderComments()}</div>
          <div className="textAreaWrap">
            <textarea
              value={this.state.commentText}
              placeholder={this.state.errors.text}
              name="commentText"
              onChange={this.onChange}
              className="textArea"
            />
            <button onClick={this.addComment} className="submitComment">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ForumPost;
