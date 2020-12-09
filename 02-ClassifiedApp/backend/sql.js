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
        host     : 'classifiedappdb.csyrkhn1j1ii.us-east-1.rds.amazonaws.com',
        port     : 3306,
        user     : 'admin',
        password : '{C^^$^+E4p}x~H&5',
        database : 'dbo'
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

function getAllCategories(cb) {
    var queryString = "SELECT * FROM Category c WHERE c.isActive = true"
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