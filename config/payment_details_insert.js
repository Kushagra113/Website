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

module.exports.alldetails=(username,cb)=>{
    sql=`select name,amount,date from payments where name=?`;
    con.query(sql,username,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result);           
        }
    })
}

module.exports.lastmonth=(username,cb)=>{
    sql=`select date from payments where name=? limit 1`;
    con.query(sql,username,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            con.query("select * from payments where name=? and extract(month from date)=?",[username,result[0].date.getMonth()+1],(err,result1)=>{
                if(err){
                    cb(err,null);
                }                
                else{
                    cb(null,result1);
                }
            })
        }
    })
}

