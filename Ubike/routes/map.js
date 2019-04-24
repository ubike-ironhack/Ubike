// const express = require("express");
// const router = express.Router();
// const Bike = require("../models/Bike");

// router.get("/", (req, res) => {
//   Bike.find().then(bike => {
//     res.render("bike", { bike });
//   });
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

// module.exports = router;