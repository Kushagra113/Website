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

module.exports.check_complaints=(complaint,id,cb)=>{
    sql="select id,complaint from complaints where id=? and complaint=?"
    con.query(sql,[id,complaint],(err,result)=>{
        if(err){
            cb(err,null);
        }
        else{
            cb(null,result);
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

module.exports.removecomplaint=(id,complaint,cb)=>{
    sql=`delete from complaints where id=? and complaint=?`;
    // console.log(id);
    con.query(sql,[id,complaint],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.editcomplaint=(id,complaint,newComplaint,cb)=>{
    sql="update complaints set complaint=? where id=? and complaint=?";
    con.query(sql,[newComplaint,id,complaint],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result);
        }
    });
}