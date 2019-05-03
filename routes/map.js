const express = require("express");
const router = express.Router();
const Bike = require("../models/Bike");
const User = require("../models/User");
const helpers = require("../helpers/function");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }else{
    req.redirect("auth/login")
  }
};

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      next();
    } else {
      res.redirect("/admin");
    }
  };
}

router.get("/admin", checkRoles("ADMIN"), helpers.isAuth, (req, res) => {
  let auth =req.isAuthenticated()
  let { user } = req;
  Bike.find()
  .populate("user")
  .then(bikes =>{
    res.render("admin", { user, bikes, auth:auth });
  });
});

router.get("/user/json", (req, res) => {
  User.find()
    .limit(20)
    .then(user => {
      res.status(200).json({ user });
    });
});
  

router.get("/json", (req, res) => {
  Bike.find()
    .limit(20)
    .then(bike => {
      res.status(200).json({ bike });
    });
});


router.get("/private", checkRoles("ADMIN"), helpers.isAuth, (req, res) => {
  let auth =req.isAuthenticated()
  let { user } = req;
  Bike.find()
    .then(bikes => {
      res.render("private", { bikes, user, auth:auth });
  });
});

router.post("/private", checkRoles("ADMIN"), (req, res) => {
  let {lat, lng, number} = req.body;
  let position = {coordinates: [lat, lng]}
  bike = {position, number}
  Bike.create(bike).then((b) => {
    console.log(b)
    res.redirect("/map")
  })
  .catch(err => console.log(err) )
});

router.get("/", helpers.isAuth, (req, res) => {
  let auth =req.isAuthenticated()
 Bike.find().then( bikes => {
   //console.log('las bikes', bikes.map(obj => obj.position.coordinates))
  res.render("map/map", {auth, bikes})
  const user = req.params
 })
  /*User.findById()

  
  console.log('esta sera la visa del map',auth);
  res.render('map/map',{auth:auth} ) */
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
