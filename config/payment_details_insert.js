const con = require("../config/database");

module.exports.addpaymentdetails=(name,cardnumber,expiration_date,securitycode,amount,cb)=>{
    con.query("create table if not exists payments(name varchar(20),cardnumber varchar(17),expiration_date varchar(6),securitycode int(4),amount int(8),date DATETIME DEFAULT CURRENT_TIMESTAMP);");
    sql=`INSERT INTO payments(name,cardnumber,expiration_date,securitycode,amount) VALUES(?,?,?,?,?)`;
    con.query(sql,[name,cardnumber,expiration_date,securitycode,amount],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.test_date=(username,cb)=>{
    sql=`select date from payments where name=?`;
    con.query(sql,username,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            console.log("Date"+result);
            console.log("Date"+result[0].date);
            console.log(result[0].date.getMonth());            
        }
    })
}

