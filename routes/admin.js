// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = require("../config/database");
const passport = require("passport");
const payments = require("../config/payment_details_insert");
const complaints = require("../config/crud");
const auth_function = require("../config/auth");

// Admin Home Page
router.get("/home/alldetails", auth_function.ensureAdmin, (req, res) => {
    payments.alldetails(req.user.username, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused");
        }
        else {
            if (result.length > 0) {
                res.render("home", {
                    user: req.user,
                    payment: result
                });
            }
            else {
                res.render("home", {
                    user: req.user
                });
            }
        }
    })
})

router.get("/home/lastmonth", auth_function.ensureAdmin, (req, res) => {
    payments.lastmonth(req.user.username, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused");
        }
        else {
            if (result.length > 0) {
                res.render("home", {
                    user: req.user,
                    payment: result
                });
            }
            else {
                res.render("home", {
                    user: req.user
                });
            }
        }
    })
})
// Admin Complaint Page
router.get("/complaint", auth_function.ensureAdmin, (req, res) => {
    res.render("complaint", {
        user: req.user
    })
});

// Admin Payment Page
router.get("/payment", auth_function.ensureAdmin, (req, res) => {
    res.render("payment", {
        user: req.user
    });
})

// Admin About Us Page
router.get("/aboutus", auth_function.ensureAdmin, (req, res) => {
    res.render("aboutus", {
        user: req.user
    });
})

// Adding Payment Details to the database
router.post("/payment", auth_function.ensureAuthenticated, (req, res) => {
    const { name, cardnumber, expirationdate, securitycode, amount } = req.body;
    payments.addpaymentdetails(name, cardnumber, expirationdate, securitycode, amount, (err, result) => {
        if (err) {
            res.json({ msg: "error" })
        }
        else {
            res.json({ msg: "success_insert" });
        }
    });
});


// Admin Deleting Permissions
router.delete("/complaint/removecomplaint", auth_function.ensureAdmin, (req, res) => {
    complaints.removecomplaint(req.body.id, req.body.complaint, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ msg: "error" });
        }
        else {
            res.json({ msg: "success" });
        }
    });
})

module.exports = router;