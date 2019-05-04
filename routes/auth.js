const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const mailer = require("../helpers/mailer");
const crypto = require("crypto");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/map",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
}); 

router.post("/signup", (req, res, next) => {
  const username = req.body.name;
  const password = req.body.password;
  const lastname = req.body.lastname;

  
  
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "name", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    //Hola
    const newUserone = new User({
      name: username,
      lastname: lastname,
      email:req.body.email,
      password: hashPass
    });

      const randomToken = crypto.randomBytes(25).toString("hex");
    newUser = { ...newUserone, confirmationCode: randomToken };
    User.register(newUserone, password)
      .then(user => {
        let options = {
          email: newUserone.email,
          subject: "UBike - Email verification",
          user: newUserone.name,
          confirmationUrl: `http://localhost:${
            process.env.PORT
          }/auth/confirm/${randomToken}`
        };
        options.filename = "confirmation";

        mailer
          .send(options)
          .then(() => {
            res.redirect("/auth/login");
          })
          .catch(err => {
            res.redirect("/auth/login");
          });
      })
      .catch(err => {
        res.render("auth/signup", err.message);
      });
      // newUserone.save()
      // .then(() => {
      //   console.log('Done')
      //   res.redirect("/");
      // })
      // .catch(err => {
      //   console.log('error:',err)
      //   res.render("auth/signup", { message: "Something went wrong" });
      // })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/confirm/:code", (req, res) => {
  let { code } = req.params;
  User.findOne({ confirmationCode: code })
    .then(user => {
      let { _id } = req.params;
      User.findOneAndUpdate(_id, { $set: { active: true } }).then(user => {
        res.render("auth/confirmed");
      });
    })
    .catch(err => {
      res.render("auth/signup", { err: "Something went wrong" });
      console.log(err)
    });
});

module.exports = router;
