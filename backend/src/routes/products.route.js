const router = require("express").Router();
const { get } = require("../controllers/product.controller");

router.get("/", get);

module.exports = router;
