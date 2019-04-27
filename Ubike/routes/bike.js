const express = require("express");
const router = express.Router();
const Property = require("../models/Bike");

 router.get("/map", (req, res) => {
  res.render("new");
});

 router.post("/map", (req, res) => {
  let { user } = req;
  req.body.owner = user._id;
  Bike.create(req.body)
    .populate("owner")
    .then(() => {
      res.redirect("/private");
    });
});

 module.exports = router;