const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  requireSignIn,
  adminMiddleware,
  logUserBehavior,
} = require("../controllers/auth");
const {
  read,
  publicProfile,
  update,
  photo,
  getUsersThatNeedConfirmations,
  confirmUser,
  rejectUser,
  getQuestions,
  getUsers,
  sendAcceptanceRequest,
  addFavourite,
  removeFavourite,
  checkInFavourites,
} = require("../controllers/user");

router.get("/user/profile", requireSignIn, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put(
  "/user/update",
  requireSignIn,
  authMiddleware,
  update
);
router.get("/user/photo/:username", photo);
router.post("/users", getUsers);
router.post("/user/acceptance-request",requireSignIn, authMiddleware, logUserBehavior, sendAcceptanceRequest);
router.post("/user/in-favourite",requireSignIn, authMiddleware, checkInFavourites);
router.post("/user/add-favourite",requireSignIn, authMiddleware, logUserBehavior, addFavourite);
router.post("/user/remove-favourite",requireSignIn, authMiddleware, logUserBehavior, removeFavourite);
//Admin operations
router.get(
  "/users/need-confirmation",
  requireSignIn,
  adminMiddleware,
  getUsersThatNeedConfirmations
);
router.put("/confirm", requireSignIn, adminMiddleware, confirmUser);
router.put("/reject", requireSignIn, adminMiddleware, rejectUser);
router.get("/user-questions", getQuestions);
module.exports = router;
