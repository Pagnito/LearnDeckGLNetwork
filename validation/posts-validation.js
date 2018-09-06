const validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.topic = !isEmpty(data.topic) ? data.topic : "";

  if (validator.isEmpty(data.topic)) {
    errors.topic = "Topic is required";
  }
  if (validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }
  if (!validator.isLength(data.description, { min: 10, max: 150 })) {
    errors.description = "Description should be between 10 and 150 characters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "Content is required";
  }
  if (!validator.isLength(data.text, { min: 10 })) {
    errors.text = "Post should be at least 10 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
