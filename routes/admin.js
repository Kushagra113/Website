// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = require("../config/database");
const passport = require("passport");
const complaints = require("../config/crud");
const auth_function = require("../config/auth");

// Admin Home Page
router.get("/home",auth_function.ensureAdmin ,(req, res) => {
    res.render("home",{
        user:req.user
    });
})

// Admin Complaint Page
router.get("/complaint",auth_function.ensureAdmin,(req,res)=>{
    res.render("complaint",{
        user:req.user
    })
});

// Admin About Us Page
router.get("/aboutus",auth_function.ensureAdmin, (req,res)=>{
    res.render("aboutus",{
        user:req.user
    });
})

// Admin Deleting Permissions
router.delete("/complaint/removecomplaint",auth_function.ensureAdmin,(req,res)=>{
    complaints.removecomplaint(req.body.id,req.body.complaint,(err,result)=>{
        if(err){
            console.log(err);
            res.json({msg:"error"});
        }
        else{
            res.json({msg:"success"});
        }
    });
})

module.exports=router;