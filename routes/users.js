// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = require("../config/database");
const passport = require("passport");
const complaints = require("../config/crud");
const auth_function = require("../config/auth").ensureAuthenticated;

// Home Page
router.get("/home",auth_function ,(req, res) => {
    res.render("home");
})

// Payment Page
router.get("/payment", auth_function,(req, res) => {
    res.render("payment");
})

// Complaint page
router.get("/complaint",auth_function,(req,res)=>{
    res.render("complaint");
})

router.get("/complaint/getdata",auth_function,(req,res)=>{
    complaints.getcomplaint((err,result)=>{
        if(err){
            res.json({msg:"error"});
        }
        else{
            res.json({msg:"success",data:result});
        }
    })
})

router.delete("/complaint/removecomplaint",auth_function,(req,res)=>{
    complaints.removecomplaint(req.body.id,(err,result)=>{
        if(err){
            console.log(err);
            res.json({msg:"error"});
        }
        else{
            res.json({msg:"success"});
        }
    });
});


// Adding To The Database
router.post("/complaint",auth_function,(req,res)=>{
    const {name,complaint} = req.body;
    const user_id = req.user.id;
    complaints.addcomplaint(name,complaint,user_id,(err,result)=>{
        if(err){
            res.json({msg:"error"});
        }
        else{
            res.json({msg:"success"});
        }
    });
});


// Post Requests
router.post("/sign", (req, res) => {
    const { Username, email, password, password2 } = req.body;
    let errors = [];

    // Check for All Required Fields
    if (!Username || !email || !password || !password2) {
        errors.push({ msg: "Please Fill In All Fields" });
    }

    // Check for Both Passwords
    if (password !== password2) {
        errors.push({ msg: "Passwords Do Not Match" });
    }

    // Passwords are atleast 6 characters Long
    if (password.length < 6) {
        errors.push({ msg: "Password Should be ateast 6 Characters" });
    }

    // Check if there are errors
    if (errors.length > 0) {
        res.render("sign", {
            errors,
            Username,
            email,
            password,
            password2
        })
    }

    // Validation Passed
    else {
        sql = "select email from account where email=?";
        con.query(sql, [email], (err, result) => {
                if (err) {
                    throw err;
                } else if (result.length == 1) {
                    errors.push({ msg: "Email Is already Registered" });
                    res.render("sign", {
                        errors,
                        Username,
                        email,
                        password,
                        password2
                    })
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            } else {
                                // console.log(password);
                                password_hashed = hash
                                sql = "insert into account(username,email,password) values(?,?,?)";
                                con.query(sql, [Username, email, password_hashed], (err) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        req.flash("success_msg", "You are successfully Registered and now can Log in");
                                        res.redirect("/login");
                                    }
                                })
                            } // Inner Query Callback Function

                        })
                    })
                } // Else part 
            }) // Callback Function Of Query
    }
})

// Login Handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/users/home",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
})

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router