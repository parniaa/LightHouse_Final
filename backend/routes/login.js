var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/login", (req, res) => {
  console.log(req);
});

module.exports = router;