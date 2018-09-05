const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function validateRepoInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.githubLink = !isEmpty(data.githubLink) ? data.githubLink : "";
  data.repoDescription = !isEmpty(data.repoDescription)
    ? data.repoDescription
    : "";

  if (validator.isEmpty(data.repoName)) {
    errors.repoName = "Repo name is required";
  }
  if (validator.isEmpty(data.githubLink)) {
    errors.githubLink = "Github repo link is required";
  }
  if (!validator.isURL(data.githubLink)) {
    errors.githubLink = "Please provide a link";
  }
  if (validator.isEmpty(data.repoDescription)) {
    errors.repoDescription = "Description field is required";
  }
  if (!validator.isLength(data.repoDescription, { min: 20, max: 100 })) {
    errors.repoDescription = "Message should be between 20 and 150 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
