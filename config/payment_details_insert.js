const con = require("../config/database");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

var transaction = require('node-mysql-transaction');

module.exports.addpaymentdetails = (id, name, cardnumber, expiration_date, securitycode, amount, reason, cb)=>{
    bcrypt.genSalt(5, (err, salt) => {
        if(err){
            cb(err,null);
        }
        else{
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
    
                                } // Else for Security Code Hash
                            })
                        } // Else For Expiration Code Hash
                    })
                } // Else For Card Number Hash
            }) // Card Number Bcrypt Hash Method Starting
        }
    })


 var transaction1 = new transaction({
     connection:[mysql.createConnection,{
        host: process.env.database_host,
        user: process.env.database_user,
        password: process.env.database_password,
        database: process.env.database   
    }],
    dynamicConnection: 100,
  
    // set dynamicConnection soft removing time.
    idleConnectionCutoffTime: 10000,
    
    // auto timeout rollback time in ms
    // turn off is 0
    timeout:10000
 });
 var chain = transaction1.chain();

 chain
 .on("commit",()=>{
    console.log("Commiting Changes..");
    cb(null,"Transaction was Successfull");
 })
 .on("rollback",(err)=>{
    console.log(err);
    cb(err,"Some Error Occured Try Again Later Bruh!");
 })
 
 chain
 .query("select wallet from transaction_wallet where id=?",id)
 .on("result",(remaining_money)=>{
     if((remaining_money.wallet-amount)>0){
         chain
        .query("update transaction_wallet set wallet=wallet-? where id=?",[amount,id])
        .on("result",()=>{
            chain.query("INSERT INTO payments(id,name,cardnumber,expiration_date,securitycode,amount,reason_for_payment) VALUES(?,?,?,?,?,?,?)",
            [id, name, cardnumber, expiration_date, securitycode, amount, reason])
            .on("result",()=>{
                chain.commit();
            }).autoCommit(false);
        }).autoCommit(false)
     }
     else{
        //  cb(null,"No Sufficient Funds To Pay, Please Fill Your wallet and Come Back!");
        chain.rollback();
     }
 }).autoCommit(false)

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

