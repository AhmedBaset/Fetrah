const express = require("express");
const router = express.Router();
const {
  create,
  list,
  listAllBlogsCategoriesTags,
  read,
  remove,
  update,
  photo,
  listRelatedBlogs,
  listSearch,
  listByUser,
} = require("../controllers/blog");
const {
  adminMiddleware,
  requireSignIn,
  authMiddleware,
  canUpdateAndDelete,
} = require("../controllers/auth");

router.post("/blog", requireSignIn, adminMiddleware, create);
router.get("/blogs", list);
router.post("/blogs-categories-tags", listAllBlogsCategoriesTags);
router.get("/blog/:slug", read);
router.delete("/blog/:slug", requireSignIn, adminMiddleware, remove);
router.put("/blog/:slug", requireSignIn, adminMiddleware, update);
//return specific blog photo
router.get("/blog/photo/:slug", photo);
router.post("/blogs/related", listRelatedBlogs);
router.get("/blogs/search", listSearch);

//this for blog user crud
router.post("/user/blog", requireSignIn, authMiddleware, create);
router.get("/:username/blogs", listByUser);
router.delete(
  "/user/blog/:slug",
  requireSignIn,
  authMiddleware,
  canUpdateAndDelete,
  remove
);
router.put(
  "/user/blog/:slug",
  requireSignIn,
  authMiddleware,
  canUpdateAndDelete,
  update
);

module.exports = router;
