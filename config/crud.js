const mysql =  require("mysql");
const con = require("../config/database");

module.exports.addcomplaint=(name,complaint,user_id,cb)=>{
    sql=`INSERT INTO complaints VALUES(?,?,?)`;
    con.query(sql,[user_id,name,complaint],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            // console.log("Data Inserted Successfully");
            cb(null,result)
        }
    })
}

module.exports.getcomplaint=(cb)=>{
    sql=`select * from complaints`;
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.removecomplaint=(id,cb)=>{
    sql=`delete from complaints where id=?`;
    console.log(id);
    con.query(sql,id,(err,result)=>{
        console.log(id);
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}