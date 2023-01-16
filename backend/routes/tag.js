const express = require("express");
const router = express.Router();
const { create, list, read, remove } = require("../controllers/tag");

//validators
const { runValidation } = require("../validators");
const { tagCreateValidator } = require("../validators/tag");
const { adminMiddleware, requireSignIn } = require("../controllers/auth");

router.post(
  "/tag",
  tagCreateValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  create
);

router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignIn, adminMiddleware, remove);

module.exports = router;
