const con = require("../config/database");

module.exports.addcomplaint=(name,complaint,user_id,cb)=>{
    sql=`INSERT INTO complaints (id,name,complaint) VALUES(?,?,?)`;
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

module.exports.setresolve=(id,complaint,resolved,cb)=>{
    // sql="select resolved from complaints where id=? and complaint=?";
    sql="update complaints set resolved=? where id=? and complaint=?"
    con.query(sql,[resolved,id,complaint],(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result);
        }
    })
}

module.exports.getresolve=(cb)=>{
    con.query("select id,complaint from complaints where resolved=?",1,(error,result)=>{
        if(error){
            console.log(error);
            cb(error,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.removeresolve=(id,complaint,cb)=>{
    con.query("update complaints set resolved=? where id=? and complaint=?",[0,id,complaint],(error,result)=>{
        if(error){
            console.log(error);
            cb(error,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.getidcomplaint=(id,cb)=>{
    con.query("select * from complaints where id=? and resolved=0",id,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}


module.exports.getcomplaint_not_resolved=(id,cb)=>{
    con.query("select * from complaints where resolved=0",id,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}



module.exports.getidresolve=(id,cb)=>{
    con.query("select * from complaints where id=? and resolved=1",id,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}

module.exports.getallresolve=(id,cb)=>{
    con.query("select * from complaints where resolved=1",id,(err,result)=>{
        if(err){
            console.log(err);
            cb(err,null);
        }
        else{
            cb(null,result)
        }
    })
}

