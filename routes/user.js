const express = require("express");
const router = express.Router();
const User = require("../models/User");

// router.get("/perfil/:id", (req, res) => {
//   User.findById(req.params.id, function(err, foundUser){
//     if(err) {
//       req.flash("error", "Something went wrong");
//       res.redirect("/map")
//     }
//     res.render("user/perfil", { user: foundUser });
//   });
// });

router.get("/perfil", (req, res,) => {
  res.render("user/perfil");
}); 
 module.exports = router;