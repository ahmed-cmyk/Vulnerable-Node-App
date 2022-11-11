const router = require("express").Router();
const { create } = require("../controllers/market.controller");

// router.get('/cart', )

router.post("/", create);

module.exports = router;
