const con = require("./database");

module.exports.update = (input_value,update_detail,id,cb)=>{
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