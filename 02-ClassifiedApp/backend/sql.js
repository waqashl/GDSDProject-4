const { O_NOFOLLOW } = require('constants');
const mysql = require('mysql');

config = mysql.c

var connection

if (!process.env.dbPath) {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'dbo',
        multipleStatements: true
    });
}
else {
    connection = mysql.createConnection({
        host: 'classifiedappdb.csyrkhn1j1ii.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: '{C^^$^+E4p}x~H&5',
        database: 'dbo',
        multipleStatements: true
    });
}

function connectDB(cb) {
    connection.connect(function (err) {
        cb(err)
    });
}

// User quries...

// UserType = 1-RegUser, 2-Admin
function registerUser(user, cb) {
    connection.query("INSERT INTO User(name,address,postalCode,userType,dob,dateAdded,isActive,email,password) VALUES('" + user.name + "','" + user.address + "'," + user.postalCode + ",1,'" + user.dob + "',NOW(),true,'" + user.email + "','" + user.password + "')", function (err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function getUser(email, password, cb) {
    connection.query("SELECT id,name,address,postalCode,userType,dob,dateAdded,isActive,email FROM User u WHERE u.email = '" + email + "' AND password = '" + password + "'",
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}

function getUserofId(id, cb) {
    connection.query("SELECT id,name,address,postalCode,userType,dob,dateAdded,isActive,email FROM User u WHERE u.id = " + id,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}


// Category queries

function addCategory(category, cb) {
    connection.query("INSERT INTO Category(name,isActive) VALUES('" + category + "',true)", function (err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}
function deleteCategory(id, cb) {
    connection.query("UPDATE Category set isActive=false WHERE id=" + id, function (err, rows) {
        if (err) cb(err);
        else cb(undefined, rows);
    });
}

function getAllCategories(id = undefined, cb) {
    var queryString = "SELECT * FROM Category c WHERE c.isActive = true"

    if (id) {
        queryString += " AND c.id = " + id;
    }

    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}



// Product Queries... 
function searchProducts(searchQuery, cb) {
    var queryString = "SELECT p.id, p.title, p.location, p.status, p.category, p.price, p.thumbnail FROM Product p"

    if (searchQuery) {
        queryString = queryString + " WHERE p.title LIKE '%" + searchQuery + "%'"
    }

    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}

function productDetails(id, user_id, cb) {
    // var queryString = "SELECT * FROM dbo.Product p where p.status != 2 AND p.id=" + id;
    var queryString = "SELECT p.id, p.title, p.desc, p.owner, p.category, p.createdAt, p.status, p.price, p.location, p.thumbnail, u.name as ownerName, u.email as ownerEmail FROM dbo.Product as p inner join dbo.User as u on u.id = p.owner where p.id=" + id + " GROUP BY p.id ";
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else {
                var productImage = "SELECT * FROM dbo.ProductImage p where p.productId=" + id;
                connection.query(productImage,
                    function (err, images) {
                        if (err) cb(err);
                        else {
                            cb(undefined, rows, images);
                        }

                    }
                );
            }
        });
    // var productDetail =connection.query(queryString);
    // console.log(productDetail);
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
        `thumbnail`) VALUES ('"+ product.title + "','" + product.desc + "'," + product.owner + "," + product.category + ",NOW(),0," + product.price + ",'" + product.location + "','" + product.thumbnail + "')";

    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });

}
function addProductImage(id, imageURLs, cb) {

    var queryString = ""
    for (url of imageURLs) {
        queryString += "INSERT INTO ProductImage(productId,image) VALUES (" + id + ",'" + url + "');";
    }
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}



/////////////////////////////////////////////CHAT////////////////////////////////////////////////
function getChatHistoryById(chatSessionId, loggedInUserId, cb) {
    var queryString = `SELECT c.*,
	U.name as opponentUserName,
    MU.name as myName
        FROM dbo.chat c
        inner join User U on (U.id = c.senderId and c.senderId <> `+ loggedInUserId + `) OR (U.id = c.receiverId and c.receiverId <>` + loggedInUserId + `)
        inner join User MU on (MU.id = c.senderId and c.senderId <> U.Id) OR (MU.id = c.receiverId and c.receiverId <> U.Id)
    WHERE chatSessionID = `+ chatSessionId + `
    ORDER BY Date`;
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}


function getChatList(userId, cb) {
    // var queryString = `
    // SELECT 
    // SenderID, 
    // ReceiverID,
    // ProductID,
    // (SELECT title FROM Product P WHERE P.Id = c.ProductID) AS ProductName,
    // SUBSTRING(
    // 	(SELECT message
    // 	FROM chat tm
    // 	WHERE ((tm.SenderID = c.SenderId AND tm.ReceiverID = c.ReceiverID) OR (tm.SenderID = c.ReceiverID AND tm.ReceiverID = c.SenderId))
    // 	AND tm.ProductID = c.ProductID
    //     ORDER BY tm.Date DESC
    //     limit 1), 1, 50
    // ) AS topMessage,
    //     senderUser.name AS SenderName,
    //     receiverUser.name AS ReceiverName
    // FROM chat c    
    // WHERE (c.ReceiverID = `+userId+` OR c.SenderID = `+userId+`)
    // GROUP BY ProductID, SenderID, ReceiverID, senderUser.name, receiverUser.name`


    var queryString = `
    SELECT
        CS.id,
        CS.user1ID,
        CS.user2ID,
        P.title AS ProductName,
        P.id AS ProductID,
        (select count(*) as totalCount from chat where ifnull(isRead, 0) = 0 and receiverId = `+ userId + `) as unreadMessages,
        SUBSTRING(
                (SELECT
                    message
                FROM chat tm
                WHERE ((tm.SenderID = CS.user1ID AND tm.ReceiverID = CS.user2ID) OR (tm.SenderID = CS.user2ID AND tm.ReceiverID = CS.user1ID))		
                AND tm.chatSessionID = CS.id
                ORDER BY tm.Date DESC
                limit 1), 1, 50
            ) AS topMessage,
            U.name as opponentUserName
        FROM chatSession CS
        INNER JOIN Product P ON P.id = CS.productID
        inner join User U on (U.id = CS.user1ID and CS.user1ID <> `+ userId + `) OR (U.id = CS.user2ID and CS.user2ID <> ` + userId + `)
        where (CS.user1ID = `+ userId + `) OR (CS.user2ID = ` + userId + `)
        order by CS.createdDate desc`;
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}

function checkAndInsertChatSession(productId, senderId, receiverId, cb) {
    //body.message = body.message.replaceAll("'", "\'");  
    var queryString = `call CheckAndInsertChatSession(` + productId + `,` + senderId + `, ` + receiverId + `)`;
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}

function updateReadBit(chatSessionID, receiverId, cb) {
    //body.message = body.message.replaceAll("'", "\'");  
    var queryString = `update chat
        set isRead = 1
        where receiverId = `+ receiverId + ` and chatSessionID = ` + chatSessionID;

    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}

function getNotification(receiverId, cb) {
    //body.message = body.message.replaceAll("'", "\'");  
    var queryString = `select count(*) as totalCount from chat
    where ifnull(isRead, 0) = 0
    and receiverId = `+ receiverId;

    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}


function insertChat(body, cb) {
    console.log(body);

    //body.message = body.message.replaceAll("'", "\'");  
    var queryString = `    
INSERT INTO dbo.chat
( Message ,
  Date ,
  SenderID ,
  ReceiverID ,
  chatSessionID,
  isRead
)
VALUES  ( '`+ body.message + `' , -- Message - varchar(max)
  now() , -- Date - datetime
  `+ body.senderId + ` , -- SenderID - int
  `+ body.receiverId + ` , -- ReceiverID - int
  `+ body.chatSessionID + `,  -- chatSessionID - int
    false  -- isRead - bool

)`;
    connection.query(queryString,
        function (err, rows) {
            if (err) cb(err);
            else cb(undefined, rows);
        });
}



/////////////////////////////////////////////////////////////////////////////////////////////////







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
    addProductImage: addProductImage,
    getChatHistoryById: getChatHistoryById,
    getChatList: getChatList,
    insertChat: insertChat,
    checkAndInsertChatSession: checkAndInsertChatSession,
    updateReadBit: updateReadBit,
    getNotification: getNotification

}


