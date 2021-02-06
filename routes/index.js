// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = require("../config/database");
const passport = require("passport");
const auth_function = require("../config/auth").ensureNotAuthenticated;

// Signup Page
router.get("/", auth_function,(req, res) => {
    res.render("sign");
});

// Login Page
router.get("/login",auth_function, (req, res) => {
    res.render("login");
})

// Exporitng Router Module  
module.exports = router