const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
module.exports = function validateLoginInput(data) {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let errors = {};

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
