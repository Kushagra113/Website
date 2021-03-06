const con = require("../config/database");

module.exports.getdata=(cb)=>{
    sql="select * from account";
    con.query(sql,(err,result)=>{
        if(err){
            cb(err,null);
        }
        else{
            cb(null,result);
        }
    })
}

module.exports.getiddata=(id,cb)=>{
    sql="select * from account where id=?"
    con.query(sql,id,(err,result)=>{
        if(err){
            cb(err,null);
        }
        else{
            cb(null,result);
        }
    })
}