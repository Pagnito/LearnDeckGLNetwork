import React, { Component } from "react";
import "../styles/add-repo.css";
import axios from "axios";
class AddRepo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      repoName: "",
      githubLink: "",
      repoDesc: "",
      errors: {}
    };
  }
  hideForm = () => {
    document.getElementById("addRepoForm").classList.add("hide");

    document.getElementById("addRepoForm").classList.remove("show");

    this.setState({
      repoName: "",
      githubLink: "",
      repoDesc: ""
    });
  };
  addRepo = e => {
    e.preventDefault();

    const newRepo = {
      repoName: this.state.repoName,
      githubLink: this.state.githubLink,
      repoDescription: this.state.repoDesc
    };
    axios
      .post("/api/repos/postRepo", newRepo)
      .then(res => {
        this.setState({
          repos: res.data,
          repoName: "",
          githubLink: "",
          repoDesc: ""
        });
        document.getElementById("addRepoForm").classList.remove("show");
        document.getElementById("addRepoForm").classList.add("hide");
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          errors: err.response.data,
          repoName: err.response.data.repoName ? "" : this.state.repoName,
          githubLink: err.response.data.githubLink ? "" : this.state.githubLink,
          repoDesc: err.response.data.repoDescription
            ? ""
            : this.state.repoDescription
        });
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div id="addRepoForm" className="addRepoWrap">
        <form onSubmit={this.addRepo} className="addRepoForm">
          <input
            onChange={this.onChange}
            name="repoName"
            placeholder={
              this.state.errors.repoName
                ? this.state.errors.repoName
                : "Repo Name"
            }
            value={this.state.repoName}
            className="repoName repoInput"
          />
          <input
            onChange={this.onChange}
            name="githubLink"
            placeholder={
              this.state.errors.githubLink
                ? this.state.errors.githubLink
                : "GitHub Repo Link"
            }
            value={this.state.githubLink}
            className="githubLink repoInput"
          />
          <textarea
            onChange={this.onChange}
            name="repoDesc"
            placeholder={
              this.state.errors.repoDescription
                ? this.state.errors.repoDescription
                : "Repo Description"
            }
            value={this.state.repoDesc}
            className="repoDesc repoInput"
          />
          <div className="btnWrapper">
            <button
              onClick={this.hideForm}
              type="button"
              className="cancelAddRepo"
            >
              Cancel
            </button>
            <button className="addRepo">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddRepo;
