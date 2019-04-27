<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");
const User = require("../models/User");
const helpers = require("../helpers/function");

=======
// const express = require("express");
// const router = express.Router();
// const Bike = require("../models/Bike");

//router.get("/map", (req, res, next) => {
//  res.render("map/map", { "message": req.flash("error") });
//});
>>>>>>> 43c4af47c3e1d56e7ddfefc2b72fcfb0313c90d2

router.get("/", helpers.isAuth, (req, res) => {
  console.log()
  let auth =req.isAuthenticated()
  const user = req.params
  User.findById()
  console.log('esta sera la visa del map',auth);
  res.render('map',{auth:auth} ) 
});

// router.get("/login", (req, res) => {
  
// });

// router.get("/new", (req, res) => {
//   res.render("new");
// });

// router.post("/new", (req, res) => {
<<<<<<< HEAD
//   let { lng, lat, } = req.body;
//   let bicycle = {
=======
//   let { lng, lat, name, description } = req.body;
//   let bicycle = {
//     name,
//     description,
>>>>>>> 43c4af47c3e1d56e7ddfefc2b72fcfb0313c90d2
//     location: {
//       type: "Point",
//       coordinates: [lng, lat]
//     }
//   };
//   Bike.create(bike).then(bike => {
//     res.redirect("/map");
//   });
// });

<<<<<<< HEAD

// router.get("/:id/edit", (req, res) => {
//   let { id } = req.params;
//   Bike.findById(id).then(bike => {
//     res.render("new", bike);
//   });
// });

=======
// router.get("/:id/edit", (req, res) => {
//   let { id } = req.params;
//   Bike.findById(id).then(bike => {
//     res.render("new", bike);
//   });
// });

>>>>>>> 43c4af47c3e1d56e7ddfefc2b72fcfb0313c90d2
// router.post("/:id/edit", (req, res) => {
//   let { id } = req.params;
//   let { lng, lat, name, description } = req.body;
//   let bicycle = {
<<<<<<< HEAD
=======
//     name,
//     description,
>>>>>>> 43c4af47c3e1d56e7ddfefc2b72fcfb0313c90d2
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

<<<<<<< HEAD
module.exports = router;
=======
// module.exports = router;
>>>>>>> 43c4af47c3e1d56e7ddfefc2b72fcfb0313c90d2
