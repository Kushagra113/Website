const con = require("./database");
const bcrypt =require("bcryptjs");

module.exports.update = (input_value,update_detail,id,cb)=>{
    if(update_detail==="password"){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(input_value,salt,(err,hashed_password)=>{
                sql=`update account set ${update_detail}=? where id=?`
                con.query(sql,[hashed_password,id],(err,result)=>{
                    if(err){
                        console.log(err);
                        cb(err,null);
                    }
                    else{
                        cb(null,result);
                    }
                })
            })
        })
    }
    else{
        sql=`update account set ${update_detail}=? where id=?`
        con.query(sql,[input_value,id],(err,result)=>{
            if(err){
                console.log(err);
                cb(err,null);
            }
            else{
                cb(null,result);
            }
        })
    }
}