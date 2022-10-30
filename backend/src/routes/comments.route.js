const express = require("express");
const router = express.Router();
const { get, store } = require("../controllers/comment.controller");

router.get("/:id", get);

router.post("/store", store);

module.exports = router;
