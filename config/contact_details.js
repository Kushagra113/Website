const con = require("../config/database");

module.exports.insertcontact_details=(id,name,email,phone,msg,cb)=>{
    sql="create table if not exists contact (id int(5),name varchar(20),email varchar(30),phone varchar(10),message varchar(300));";
    con.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            con.query("insert into contact values(?,?,?,?,?)",[id,name,email,phone,msg],(err,result)=>{
                if(err){
                    cb(err,null);
                } 
                else{
                    cb(null,result);
                }
            });
        }
    })
}