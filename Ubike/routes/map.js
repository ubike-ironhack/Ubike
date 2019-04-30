
const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");
const User = require("../models/User");
const helpers = require("../helpers/function");

//router.get("/map", (req, res, next) => {
//  res.render("map/map", { "message": req.flash("error") });
//});

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {

    res.redirect("/private")
  }
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

router.get("/", helpers.isAuth, (req, res) => {
  console.log()
  let auth =req.isAuthenticated()
  const user = req.params
  User.findById()
  console.log('esta sera la visa del map',auth);
  res.render('map/map',{auth:auth} ) 
});

// router.get("/login", (req, res) => {
  
// });

// router.get("/new", (req, res) => {
//   res.render("new");
// });

// router.post("/new", (req, res) => {
//   let { lng, lat, name, description } = req.body;
//   let bicycle = {
//     name,
//     description,
//     location: {
//       type: "Point",
//       coordinates: [lng, lat]
//     }
//   };
//   Bike.create(bike).then(bike => {
//     res.redirect("/map");
//   });
// });

// router.get("/:id/edit", (req, res) => {
//   let { id } = req.params;
//   Bike.findById(id).then(bike => {
//     res.render("new", bike);
//   });
// });

// router.post("/:id/edit", (req, res) => {
//   let { id } = req.params;
//   let { lng, lat, name, description } = req.body;
//   let bicycle = {
//     name,
//     description,
//     location: {
//       type: "Point",
//       coordinates: [lng, lat]
//     }
//   };
//   Bike.findByIdAndUpdate(id, { $set: bike }).then(() => {
//     res.redirect("/map");
//   });
// });

// router.get("/:id/delete", (req, res) => {
//   let { id } = req.params;
//   Bike.findByIdAndDelete(id).then(() => {
//     res.redirect("/map");
//   });
// });

 module.exports = router;
