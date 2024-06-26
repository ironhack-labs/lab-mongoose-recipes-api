const router = require("express").Router();

router.use("/recipes", require("./recipe.routes"));

module.exports = router;
