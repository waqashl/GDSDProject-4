const mysql = require('mysql');

config = mysql.c

var connection

if(!process.env.dbPath) {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'E-MarktFulda(Local)'
    });
}
else {
    connection = mysql.createConnection({
        host     : 'classifiedappdb.csyrkhn1j1ii.us-east-1.rds.amazonaws.com:3306',
        user     : 'admin',
        password : '{C^^$^+E4p}x~H&5',
        database : 'classifiedAppDB'
    });
}



function connectDB(cb) {
    connection.connect(function(err) {
        cb(err)
    });    
}

function registerUser(user, cb) {
    connection.query("INSERT INTO User(name,dob,address,email,password) VALUES('"+user.name+"','"+user.dob+"','"+user.address+"','"+user.email+"','"+user.password+"')", function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });    
}

function getUser(email, password, cb) {
    connection.query("SELECT id, name, dob, address, email FROM User u WHERE u.email = '"+email+"' AND password = '"+password+"'",
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

module.exports = {
    connectDB: connectDB,
    registerUser: registerUser,
    getUser: getUser
}