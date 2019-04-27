const express = require('express');
const router  = express.Router();
const Bike = require("../models/Bike");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect("/private");
    }
  };
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*router.get("/private", isAuth, (req, res) => {
  let { user } = req;
  Property.find()
    .populate("owner")
    .then(properties => {
      properties = properties.map(property => {
        return String(property.owner._id) === String(user._id)
          ? { ...property._doc, canUpdate: true }
          : property;
      });
      res.render("private", { user, properties });
    });
});*/

router.get("/private", isAuth, (req, res) => {
    let { user } = req;
    Bike.find()
    .populate("owner")
    .then(bikes =>{
      bikes = bikes.map(bike =>{
        return String(bike.owner._id) === String(user._id)
        ? { ...bike._doc, canUpdate: true }
        : property;
      });
      res.render("private", { user, bikes });
    });
});


router.get("/admin", checkRoles("ADMIN"), (req, res) => {
  let { user } = req;
  Bike.find().then(bikes => {
    res.render("admin", { bikes, user });
  });
});


module.exports = router;
