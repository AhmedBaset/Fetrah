const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name").not().isEmpty().withMessage("يجب أن تكتب اسمك"),
  check("email").isEmail().withMessage("يجب أن تدخل بريدك الإلكتروني الحقيقي"),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage("رسالتك أقصر من أن نرد عليها"),
];
