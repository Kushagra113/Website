// Requiring Necessary Modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var con = require("../config/database");
const passport = require("passport");
const complaints = require("../config/crud");
const payments = require("../config/payment_details_insert");
const auth_function = require("../config/auth");
const getalldata = require("../config/getalldata");

// Home Page
router.get(
    "/home/alldetails",
    auth_function.ensureAuthenticated,
    (req, res) => {
        payments.alldetails(req.user.id, (err, result) => {
            if (err) {
                console.log(err);
                res.send(
                    "Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused"
                );
            } else {
                complaints.getidcomplaint(req.user.id, (err, result_c) => {
                    complaint_number = result_c.length;
                    complaints.getidresolve(req.user.id, (err, result_r) => {
                        resolve_number = result_r.length;
                        if (result.length > 0) {
                            res.render("home", {
                                user: req.user,
                                payment: result,
                                c_no: complaint_number,
                                r_no: resolve_number,
                                p_no: result.length,
                            });
                        } else {
                            res.render("home", {
                                user: req.user,
                                c_no: complaint_number,
                                r_no: resolve_number,
                                p_no: result.length,
                            });
                        }
                    });
                });
            }
        });
    }
);

// Last Month
router.get("/home/lastmonth", auth_function.ensureAuthenticated, (req, res) => {
    payments.lastmonth(req.user.id, (err, result) => {
        if (err) {
            console.log(err);
            res.send(
                "Error Displaying Home Page. Please Try Again Later! Sorry For the Inconvenience Caused"
            );
        } else {
            complaints.getidcomplaint(req.user.id, (err, result_c) => {
                complaint_number = result_c.length;
                complaints.getidresolve(req.user.id, (err, result_r) => {
                    resolve_number = result_r.length;
                    if (result.length > 0) {
                        res.render("home", {
                            user: req.user,
                            payment: result,
                            c_no: complaint_number,
                            r_no: resolve_number,
                            p_no: result.length,
                        });
                    } else {
                        res.render("home", {
                            user: req.user,
                            c_no: complaint_number,
                            r_no: resolve_number,
                            p_no: result.length,
                        });
                    }
                });
            });
        }
    });
});

// Payment Page
router.get("/payment", auth_function.ensureAuthenticated, (req, res) => {
    res.render("payment", {
        user: req.user,
    });
});

// Adding Payment Details to the database
router.post("/payment", auth_function.ensureAuthenticated, (req, res) => {
    const {
        name,
        cardnumber,
        expirationdate,
        securitycode,
        amount,
        reason,
    } = req.body;
    const id = req.user.id;
    payments.addpaymentdetails(
        id,
        name,
        cardnumber,
        expirationdate,
        securitycode,
        amount,
        reason,
        (err, result) => {
            if (err) {
                res.json({ msg: "error" });
            } else {
                res.json({ msg: "success_insert" });
            }
        }
    );
});

// About Us Page
router.get("/aboutus", auth_function.ensureAuthenticated, (req, res) => {
    res.render("aboutus", {
        user: req.user,
    });
});
// Get Resolve

router.get("/getresolve", auth_function.ensureAuthenticated, (req, res) => {
    complaints.getresolve((err, result) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: result });
        }
    });
});

// Complaint page
router.get("/complaint", auth_function.ensureAuthenticated, (req, res) => {
    res.render("complaint", {
        user: req.user,
    });
});

// Printing All The Complaints
router.get(
    "/complaint/getdata",
    auth_function.ensureAuthenticated,
    (req, res) => {
        complaints.getcomplaint((err, result) => {
            if (err) {
                res.json({ msg: "error" });
            } else {
                res.json({ msg: "success", data: result });
            }
        });
    }
);

// Deleting The Complaint
router.delete(
    "/complaint/removecomplaint",
    auth_function.ensureAuthenticated,
    (req, res) => {
        if (req.user.id == req.body.id) {
            complaints.removecomplaint(
                req.body.id,
                req.body.complaint,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ msg: "error" });
                    } else {
                        res.json({ msg: "success" });
                    }
                }
            );
        } else {
            res.json({ msg: "user_error" });
        }
    }
);

// Editing The Complaint
router.post(
    "/complaint/editcomplaint",
    auth_function.ensureAuthenticated,
    (req, res) => {
        const { id, complaint, newComplaint } = req.body;
        // console.log("id"+id+"Id2:"+req.user.id+"complaint"+complaint+"New Complaint"+newComplaint);
        if (req.user.id == id) {
            complaints.check_complaints(newComplaint, id, (err, result) => {
                if (err) {
                    res.json({ msg: "error" });
                } else if (result.length > 0) {
                    console.log(result[0]);
                    res.json({ msg: "same_complaint" });
                } else {
                    complaints.editcomplaint(
                        id,
                        complaint,
                        newComplaint,
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.json({ msg: "error" });
                            } else {
                                res.json({ msg: "success" });
                            }
                        }
                    );
                }
            });
        } else {
            console.log("Success!@#");
            res.json({ msg: "user_error" });
        }
    }
);

// Adding To The Database
router.post("/complaint", auth_function.ensureAuthenticated, (req, res) => {
    const complaint = req.body.complaint;
    const name = req.user.username;
    const user_id = req.user.id;
    complaints.check_complaints(complaint, user_id, (err, result) => {
        if (err) {
            res.json({ msg: "error" });
        } else if (result.length > 0) {
            res.json({ msg: "same_complaint" });
        } else {
            complaints.addcomplaint(name, complaint, user_id, (err, result) => {
                if (err) {
                    res.json({ msg: "error" });
                } else {
                    res.json({ msg: "success" });
                }
            });
        }
    });
});
//members page
router.get("/members", auth_function.ensureAuthenticated, (req, res) => {
    getalldata.getdata((err, result) => {
        if (err) {
            throw err;
        } else {
            res.render("members", {
                user: req.user,
                result: result,
            });
        }
    });
});

router.post("/getiddata", auth_function.ensureAuthenticated, (req, res) => {
    const id = req.body.id;
    getalldata.getiddata(id, (err, result) => {
        if (err) {
            res.json({ msg: "error" });
        } else {
            res.json({ msg: "success", data: result });
        }
    });
});

router.get("/game", auth_function.ensureAuthenticated, (req, res) => {
    res.render("game");
});

// Post Requests
router.post("/sign", (req, res) => {
    const {
        Username,
        PhoneNo,
        FlatNo,
        Gender,
        email,
        password,
        password2,
        admin_check,
    } = req.body;
    let errors = [],
        admin = 0;
    console.log(PhoneNo + FlatNo + Gender);
    // Setting The Admin Value
    if (admin_check == "on") {
        admin = 1;
    }

    // Check for All Required Fields
    if (!Username ||
        !PhoneNo ||
        !FlatNo ||
        !Gender ||
        !email ||
        !password ||
        !password2
    ) {
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

    if (PhoneNo.length != 10) {
        errors.push({ msg: "Phone Number should be 10 Digits" });
    }

    if (FlatNo.length > 4) {
        errors.push({ msg: "Invalid Flat No Please Enter Again" });
    }

    // Check if there are errors
    if (errors.length > 0) {
        res.render("sign", {
            errors,
            Username,
            email,
            password,
            password2,
        });
    }

    // Validation Passed
    else {
        sql = "select email from account where email=?";
        con.query(sql, [email], (err, result) => {
            if (err) {
                req.flash("error_msg", "Server Error Occured");
            } else if (result.length == 1) {
                errors.push({ msg: "Email Is already Registered" });
                res.render("sign", {
                    errors,
                    Username,
                    email,
                    password,
                    password2,
                });
            } else {
                con.query(
                    "select Phone_no from account where Phone_no=?",
                    PhoneNo,
                    (err, result) => {
                        if (err) {
                            req.flash("error_msg", "Server Error Occured");
                        } else if (result.length == 1) {
                            errors.push({ msg: "Phone Number Is already In Use" });
                            res.render("sign", {
                                errors,
                                Username,
                                email,
                                password,
                                password2,
                            });
                        } else {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(password, salt, (err, hash) => {
                                    if (err) {
                                        throw err;
                                    } else {
                                        // console.log(password);
                                        password_hashed = hash;
                                        sql =
                                            "insert into account(username,email,password,admin,Phone_no,Flat_no,Gender) values(?,?,?,?,?,?,?)";
                                        con.query(
                                            sql, [
                                                Username,
                                                email,
                                                password_hashed,
                                                admin,
                                                PhoneNo,
                                                FlatNo,
                                                Gender,
                                            ],
                                            (err) => {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    req.flash(
                                                        "success_msg",
                                                        "You are successfully Registered and now can Log in"
                                                    );
                                                    res.redirect("/login");
                                                }
                                            }
                                        );
                                    } // Inner Query Callback Function
                                });
                            });
                        } // Else part
                    }
                );
            }
        }); // Callback Function Of Query
    }
});

// Login Handle
router.post("/login", (req, res, next) => {
    // console.log(req.body.Username);
    const { Username, password } = req.body;
    if (Username == "" || password == "") {
        req.flash("error_msg", "Please Fill in All The Fields");
        res.redirect("/login");
    } else {
        con.query(
            "select admin from account where username=?",
            Username,
            (error, result) => {
                if (error) {
                    req.flash("error_msg", "Server Error Occured");
                } else if (result.length == 0 || result[0].admin == 0) {
                    passport.authenticate("local", {
                        successRedirect: "/users/home/alldetails",
                        failureRedirect: "/login",
                        failureFlash: true,
                    })(req, res, next);
                } else if (result[0].admin == 1) {
                    passport.authenticate("local", {
                        successRedirect: "/admin/home/alldetails",
                        failureRedirect: "/login",
                        failureFlash: true,
                    })(req, res, next);
                }
            }
        );
    }
});

// Logout Handle
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
});

module.exports = router;