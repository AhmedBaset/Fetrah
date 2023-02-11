const express = require("express");
const router = express.Router();
const { authMiddleware, requireSignIn } = require("../controllers/auth");
const { read, publicProfile, update, photo} = require("../controllers/user");

router.get("/user/profile", requireSignIn, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update",  requireSignIn, authMiddleware, update)
router.get("/user/photo/:username", photo)


module.exports = router;
