const mysql = require('mysql');

config = mysql.c

var connection

if(!process.env.dbPath) {
    connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'password',
        database : 'dbo',
        port : 3306
    });
}
else {
    connection = mysql.createConnection({
        host     : 'classifiedappdb.csyrkhn1j1ii.us-east-1.rds.amazonaws.com',
        port     : 3306,
        user     : 'admin',
        password : '{C^^$^+E4p}x~H&5',
        database : 'dbo'
    });
}

function connectDB(cb) {
    console.log("Connection successful");
    connection.connect(function(err) {
        cb(err)
    });    
}

// User routes
// UserType = 1-RegUser, 2-Admin
function registerUser(user, cb) {
    connection.query("INSERT INTO User(name,address,postalCode,userType,dob,dateAdded,isActive,email,password) VALUES('"+user.name+"','"+user.address+"',"+user.postalCode+",1,'"+user.dob+"',NOW(),true,'"+user.email+"','"+user.password+"')", function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });    
}

function getUser(email, password, cb) {
    connection.query("SELECT id, name, dob, address, postalCode, email, userType, isActive FROM User u WHERE u.email = '"+email+"' AND password = '"+password+"'",
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function getUserofId(id, cb) {
    connection.query("SELECT id, name, dob, address, postalCode, email, userType, isActive FROM User u WHERE u.id = "+id,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}


// 

function addCategory(category, cb) {
    connection.query("INSERT INTO Category(name,isActive) VALUES('"+category+"',true)", function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });    
}
function deleteCategory(id, cb) {
    connection.query("UPDATE Category set isActive=false WHERE id="+id, function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });    
}

function getAllCategories(cb) {
    var queryString = "SELECT * FROM Category c WHERE c.isActive = true"
    connection.query(queryString,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function searchProducts(searchQuery, cb) {
    var queryString = "SELECT p.id, p.title , p.location, p.status, p.category, p.price, p.thumbnail FROM Product p"

    if (searchQuery) {
        queryString = queryString+" WHERE p.title LIKE '%"+searchQuery+"%'"
    }
    
    connection.query(queryString,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function productDetails(id, cb) {
    var queryString = "SELECT * FROM Product p WHERE p.status != 2 AND p.isApproved = true AND p.id = id"
    connection.query(queryString,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}


module.exports = {
    connectDB: connectDB,
    registerUser: registerUser,
    getUser: getUser,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
    searchProducts: searchProducts,
    productDetails: productDetails,
    allCategories: getAllCategories
}