const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  requireSignIn,
  adminMiddleware,
} = require("../controllers/auth");
const {
  read,
  publicProfile,
  update,
  photo,
  getUsersThatNeedConfirmations,
  confirmUser,
} = require("../controllers/user");

router.get("/user/profile", requireSignIn, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignIn, authMiddleware, update);
router.get("/user/photo/:username", photo);
//Admin operations
router.get(
  "/users/need-confirmation",
  requireSignIn,
  adminMiddleware,
  getUsersThatNeedConfirmations
);
router.put("/confirm", requireSignIn, adminMiddleware, confirmUser);

module.exports = router;
