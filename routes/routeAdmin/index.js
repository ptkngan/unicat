const express = require("express");
const router = express.Router();
router.get("/login", function (req, res) {
  res.json("admin");
});

module.exports = router;