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

router.get("/checkadmin",(req,res)=>{
    var id=req.user.id;
    // console.log(id)
    con.query("select admin from account where id=?",[id],(err,result)=>{
        if(err){
            res.json({msg:"error"})
        }
        else if(result[0].admin==1){
            res.json({msg:"success"});
        }
        else{
            res.json({msg:"user_error"});
        }
    })
});
// Exporitng Router Module  
module.exports = router