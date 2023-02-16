const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name").not().isEmpty().withMessage("Name name is required"),
  check("email").isEmail().withMessage("Email must be valid!"),
  check("message").not().isEmpty().isLength({min: 20}).withMessage("Your message is too short"),
];
