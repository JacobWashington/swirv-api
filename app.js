// Imports
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
require("./config/passport")(passport);

// App Set Up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// API Routes
app.get('/swirv/', (req, res) => {
  res.json({message: "Welcome to Swirv"});
});
app.use('/api/users', routes.User);
app.use('/swirv/comments', routes.Comment);
app.use('/swirv/episodes', routes.Episode);


// Server
const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

module.exports = server;
