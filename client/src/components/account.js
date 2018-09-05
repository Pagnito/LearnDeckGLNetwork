import React, { Component } from "react";
import "../styles/account.css";
import NotFound from "./not-found";
import axios from "axios";
import AddRepo from "./addRepo";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      changePic: ""
    };
  }
  componentDidMount() {
    window.scroll(0, 0);
    axios.get(`/api/repos/getRepos/${this.props.user.id}`).then(res => {
      this.setState({ repos: res.data });
    });
  }
  // eslint-disable-line react/prefer-stateless-function
  showAddRepoForm = () => {
    document.getElementById("addRepoForm").classList.add("show");
    document.getElementById("addRepoForm").classList.remove("hide");
  };
  showPicChanger = () => {
    document.getElementById("changePic").classList.add("showPic");
    document.getElementById("changePic").classList.remove("hidePic");
  };
  hidePicChanger = () => {
    document.getElementById("changePic").classList.add("hidePic");
    document.getElementById("changePic").classList.remove("showPic");
  };
  changePic = e => {
    e.preventDefault();
    const newPic = {
      avatar: this.state.changePic
    };
    this.props.changePic(newPic);
    this.hidePicChanger();
  };
  deleteRepo = id => {
    axios.delete(`/api/repos/deleteRepo/${id}`).then(res => {
      console.log(res.data);
      this.setState({ repos: res.data });
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  renderRepos = () => {
    if (this.state.repos.length > 0) {
      return this.state.repos.map((repo, ind) => {
        return (
          <div
            key={ind}
            target="_blank"
            href={repo.githubLink}
            className="repoWrap"
          >
            <a target="_blank" href={repo.githubLink} className="aboutRepo">
              <div className="repoListName">{repo.repoName}</div>

              <div className="repoListDesc">{repo.repoDescription}</div>
            </a>
            <div className="trashBtnWrap">
              <i
                onClick={this.deleteRepo.bind(this, repo._id)}
                className="far delRepoBtn fa-trash-alt"
              />
            </div>
          </div>
        );
      });
    }
  };

  render() {
    if (Object.keys(this.props.user).length > 0) {
      return (
        <div className="accountWrap">
          <AddRepo />
          <div className="accountLetter">
            <div className="accountHeader">
              <div className="accountImg">
                <img className="accountAvatar" src={this.props.user.avatar} />
              </div>
              <div className="accountUsername">{this.props.user.userName}</div>
              <div onClick={this.showPicChanger} className="addRepoBtn">
                Change Pic
              </div>
              <div id="changePic" className="changePicWrap">
                <input
                  name="changePic"
                  onChange={this.onChange}
                  value={this.state.changePic}
                  className="changePicInput"
                  placeholder="Provide link"
                />
                <button className="changePicBtn" onClick={this.changePic}>
                  Change
                </button>
              </div>
              <div onClick={this.showAddRepoForm} className="addRepoBtn">
                Add Repo
              </div>
            </div>
            <div className="repos">{this.renderRepos()}</div>
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
