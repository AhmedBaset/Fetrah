const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("gender").not().isEmpty().withMessage("Gender is required"),
  check("phone").not().isEmpty().isMobilePhone().withMessage("Phone is not valid"),
  check("email").isEmail().withMessage("Must be a valid Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid Email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long"),
];

exports.forgetPasswordValidator = [
  check("email").isEmail().withMessage("Must be a valid Email address"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters long"),
];
