const express = require("express");
const router = express.Router();
const Property = require("../models/Bike");

 router.get("/bike", (req, res) => {
  res.render("new");
});

 router.post("/bike", (req, res) => {
  let { user } = req;
  req.body.owner = user._id;
  Bike.create(req.body)
    .populate("owner")
    .then(() => {
      res.redirect("/private");
    });
});

 module.exports = router;