const mysql = require("mysql");

// Creating connection Object
const con = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database
});

// Connection to Mysql Server
con.connect((err) => {
    if (err) {
        throw err;
    } else {
        // console.log("MySQL Connected");
    }
})

// Creating Database If Not Exists
con.query("create database if not exists users", (err) => {
    if (err) {
        throw err;
    } else {
        // console.log("Database Created");
    }
})

// Creating Table If Not Exists
con.query("create table if not exists account(id int  auto_increment primary key,username varchar(50),email varchar(50),password varchar(200));", (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Table Created");
    }
})

module.exports = con;