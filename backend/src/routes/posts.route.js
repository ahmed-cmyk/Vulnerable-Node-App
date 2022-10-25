const express = require("express");
const router = express.Router();
const {
  get,
  show,
  create,
  update,
  destroy,
} = require("../controllers/post.controller");

router.get("/", get);

router.get("/:id", show);

router.post("/", create);

router.patch("/:id", update);

router.delete("/:id", destroy);

module.exports = router;
