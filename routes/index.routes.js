const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});
router.use("/recipes", require("./recipes.routes"));

module.exports = router;
