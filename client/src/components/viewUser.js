import React, { Component } from "react";
import axios from "axios";
import NotFound from "./not-found";
import "../styles/view-profile.css";

class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      user: {}
    };
  }
  componentDidMount() {
    window.scroll(0, 0);

    if (this.props.match.params.id) {
      this.getUser(this.props.match.params.id);
    }
  }
  getUser = id => {
    axios.get(`/api/users/getUser/${id}`).then(user => {
      axios.get(`/api/repos/showRepos/${id}`).then(repos => {
        this.setState({
          user: user.data,
          repos: repos.data
        });
      });
    });
  };
  renderRepos = () => {
    if (this.state.repos.length > 0) {
      return this.state.repos.map((repo, ind) => {
        return (
          <a
            target="_blank"
            href={repo.githubLink}
            key={ind}
            target="_blank"
            href={repo.githubLink}
            className="repoWrapView"
          >
            <div className="aboutRepoView">
              <div className="repoListNameView">{repo.repoName}</div>

              <div className="repoListDescView">{repo.repoDescription}</div>
            </div>
          </a>
        );
      });
    }
  };

  render() {
    if (Object.keys(this.state.user).length > 0) {
      return (
        <div className="viewWrap">

          <div className="viewLetter">
            <div className="viewHeader">
              <div className="viewImg">
                <img className="viewAvatar" src={this.state.user.avatar} />
              </div>
              <div className="viewUsername">{this.state.user.userName}</div>
            </div>
            <div className="reposView">{this.renderRepos()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="spinnerWrapView">
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
    }
  }
}
export default ViewUser;
