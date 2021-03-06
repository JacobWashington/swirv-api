require("dotenv").config();

const { Strategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");

// const { User } = require("../models/user");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  // passport.use(
  //   new Strategy(options, (jwtPayLoad, done) => {
  //       User.findById(jwtPayload.id)
  //       .then((user) => {
  //         const userExists = user ? done(null, user) : done(null, false);
  //         return userExists;
  //       })
  //       .catch((error) => {
  //         console.log("======> Error below (passport.js)");
  //         console.log(error);
  //       });
  //   })
  // );
};
