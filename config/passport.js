const local_strategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const con =require("./database");

module.exports = function(passport) {
    passport.use(
        new local_strategy({ usernameField: "Username" }, (Username, password, done) => {
            sql = "select * from account where username=?"
            con.query(sql, [Username], (err, result) => {
                if (err) {
                    throw err
                } else if (result.length == 0) {
                    return done(null, false, { message: "Username Is Not Registered" });
                } else {
                    // Match Password Here
                    bcrypt.compare(password, result[0].password, (err, isMatch) => {
                        if (err) {
                            throw err
                        }
                        if (isMatch) {
                            return done(null, result);
                        } else {
                            return done(null, false, { message: "Password Is Incorrect" });
                        }
                    });
                }
            })
        })

    );
    passport.serializeUser((user, done) => {
        done(null, user[0].id);
    });

    passport.deserializeUser((id, done) => {
        con.query("select * from account where id =?", [id], (err, user) => {
            done(err, user[0]);
        });
    });

};

