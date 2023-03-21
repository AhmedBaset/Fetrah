const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("يجب عليك كتابة اسمك"),
  check("gender").not().isEmpty().withMessage("يجب عليك اختيار من أنت"),
  check("phone").not().isEmpty().isNumeric().withMessage("رقم الهاتف غير صحيح"),
  check("email").isEmail().withMessage("البريد الالكتروني غير صالح"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("يجب أن تتكون كلمة السر من 6 أحرف على الأقل"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("البريد الالكتروني غير صالح"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("يجب أن تتكون كلمة السر من 6 أحرف على الأقل"),
];

exports.forgetPasswordValidator = [
  check("email").isEmail().withMessage("البريد الالكتروني غير صحيح"),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("يجب أن تتكون كلمة السر من 6 أحرف على الأقل"),
];
