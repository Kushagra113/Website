// Requiring Necessary Modules
const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");

// Configuring Enviroment Variables File
dotenv.config();

// Express Object
const app = express();

// Passport Config
require("./config/passport")(passport);

// Database
require("./config/database.js");

// Setting Static Folder for express 
app.use(express.static(__dirname + "/public"));

// Setting View Engine To EJS
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/admin", require("./routes/admin"));

// Server Port
app.listen(3000, () => console.log("Server is running"));
