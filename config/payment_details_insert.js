const con = require("../config/database");

module.exports.addpaymentdetails=(name,cardnumber,expiration_date,securitycode,cb)=>{
    console.log("Database"+cardnumber);
    con.query("create table if not exists payments(name varchar(20),cardnumber varchar(17),expiration_date varchar(6),securitycode int(4));");
    sql=`INSERT INTO payments VALUES(?,?,?,?)`;
    con.query(sql,[name,cardnumber,expiration_date,securitycode],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}
