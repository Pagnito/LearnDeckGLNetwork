const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
module.exports = function validateRegisterInput(data) {
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  let errors = {};
  if (validator.isEmpty(data.userName)) {
    errors.userName = "User Name is required";
  }
  if (!validator.isLength(data.userName, { min: 2, max: 30 })) {
    errors.userName = "User Name must be betweeen 2 and 30 characters";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be betweeen 6 and 30 characters";
  }
  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
