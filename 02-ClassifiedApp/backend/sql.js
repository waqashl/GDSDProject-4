const { O_NOFOLLOW } = require('constants');
const mysql = require('mysql');

config = mysql.c

var connection

if(!process.env.dbPath) {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'dbo'
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

// User quries...

// UserType = 1-RegUser, 2-Admin
function registerUser(user, cb) {
    connection.query("INSERT INTO User(name,address,postalCode,userType,dob,dateAdded,isActive,email,password) VALUES('"+user.name+"','"+user.address+"',"+user.postalCode+",1,'"+user.dob+"',NOW(),true,'"+user.email+"','"+user.password+"')", function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });    
}

function getUser(email, password, cb) {
    connection.query("SELECT id,name,address,postalCode,userType,dob,dateAdded,isActive,email FROM User u WHERE u.email = '"+email+"' AND password = '"+password+"'",
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function getUserofId(id, cb) {
    connection.query("SELECT id,name,address,postalCode,userType,dob,dateAdded,isActive,email FROM User u WHERE u.id = "+id,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}


// Category queries

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

function getAllCategories(id = undefined, cb) {
    var queryString = "SELECT * FROM Category c WHERE c.isActive = true"

    if(id) {
        queryString += " AND c.id = "+id;
    }

    connection.query(queryString,
    function(err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}



// Product Queries... 
function searchProducts(searchQuery, cb) {
    var queryString = "SELECT p.id, p.title, p.location, p.status, p.category, p.price, p.thumbnail FROM Product p"

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

function addProduct(product, cb) {

    console.log(product);
    var queryString = "INSERT INTO Product(\
        `title`,\
        `desc`\,\
        `owner`,\
        `category`,\
        `createdAt`,\
        `status`,\
        `price`,\
        `location`,\
        `thumbnail`) VALUES ('"+product.title+"','"+product.desc+"',"+product.owner+","+product.category+",NOW(),0,"+product.price+",'"+product.location+"','"+product.thumbnail+"')";

    connection.query(queryString,
        function(err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
    
}
function addProductImage(id, imageURLs, cb) {

    var queryString = ""
    for(url of imageURLs) {
        queryString += "INSERT INTO ProductImage(productId,image) VALUES ("+id+",'"+url+"');";
    }
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
    getUserofId: getUserofId,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
    addProduct: addProduct,
    searchProducts: searchProducts,
    productDetails: productDetails,
    allCategories: getAllCategories,
    addProductImage: addProductImage
}


