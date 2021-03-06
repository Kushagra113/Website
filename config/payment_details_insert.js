const con = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports.addpaymentdetails = (id, name, cardnumber, expiration_date, securitycode, amount, reason, cb) => {
    bcrypt.genSalt(5, (err, salt) => {
        bcrypt.hash(cardnumber, salt, (err, hash) => {
            if (err) {
                cb(err, null);
            }
            else {
                cardnumber = hash
                bcrypt.hash(expiration_date, salt, (err, exp_hash) => {
                    if (err) {
                        cb(err, null);
                    }
                    else {
                        expiration_date = exp_hash
                        bcrypt.hash(securitycode, salt, (err, sec_hash) => {
                            if (err) {
                                cb(err, null);
                            }
                            else {
                                securitycode = sec_hash;
                                con.query("create table if not exists payments(id int(5),name varchar(20),cardnumber varchar(200),expiration_date varchar(200),securitycode varchar(200),amount int(8),reason_for_payment varchar(20),date DATETIME DEFAULT CURRENT_TIMESTAMP);");
                                sql = `INSERT INTO payments(id,name,cardnumber,expiration_date,securitycode,amount,reason_for_payment) VALUES(?,?,?,?,?,?,?)`;
                                con.query(sql, [id, name, cardnumber, expiration_date, securitycode, amount, reason], (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        cb(err, null);
                                    }
                                    else {
                                        cb(null, result)
                                    }
                                })
                            } // Else for Security Code Hash
                        })
                    } // Else For Expiration Code Hash
                })
            } // Else For Card Number Hash
        }) // Card Number Bcrypt Hash Method Starting
    })
}

module.exports.alldetails = (id, cb) => {
    sql = `select name,amount,reason_for_payment,date from payments where id=?`;
    con.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            cb(err, null);
        }
        else {
            cb(null, result);
        }
    })
}

module.exports.lastmonth = (id, cb) => {
    sql = `select date from payments where id=? limit 1`;
    con.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            cb(err, null);
        }
        else {
            con.query("select * from payments where id=? and extract(month from date)=?", [id, result[0].date.getMonth() + 1], (err, result1) => {
                if (err) {
                    cb(err, null);
                }
                else {
                    cb(null, result1);
                }
            })
        }
    })
}

