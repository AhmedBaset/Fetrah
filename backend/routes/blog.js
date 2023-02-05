const express = require("express");
const router = express.Router();
const { create, list, listAllBlogsCategoriesTags, read, remove, update, photo} = require("../controllers/blog");
const { adminMiddleware, requireSignIn } = require("../controllers/auth");

router.post("/blog", requireSignIn, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignIn, adminMiddleware, remove);
router.put("/blog/:slug", requireSignIn, adminMiddleware, update);
//return specific blog photo
router.get("/blog/photo/:slug",  photo);

module.exports = router;
