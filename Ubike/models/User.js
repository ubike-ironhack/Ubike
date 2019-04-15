const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: String,
  name: {
    type: String,
    required: true,
  }, 
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: password,
    required: true
  },
  image: {
    type: String
  }, 
  timestamps: true}
  );

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  hashField: "password"
});

const User = mongoose.model('User', userSchema);
module.exports = User;
