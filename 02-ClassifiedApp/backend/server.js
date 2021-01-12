const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./config');
const sqlManager = require('./sql');
const router = require('./user');
const morgan = require('morgan');
const http = require('http');
const { Socket } = require('dgram');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://54.210.231.113:2000'],
    methods: ['GET', 'POST'],
    credentials:false
    //allowedHeaders: [{"Access-Control-Allow-Headers": "Content-Type, Authorization",
    //"Access-Control-Allow-Origin": config.allowedOrigins,
    //"Access-Control-Allow-Credentials": true}]

}));

app.use(morgan('dev'));



// use JWT auth to secure the api
// app.use(jwt());


sqlManager.connectDB(function (err) {
    if(err) {
        throw err;
    }
    console.log("Database connected");
    // api routes
    app.use('/user', require('./user.js'));
    app.use('/products', require('./products.js'));
    app.use('/category', require('./category.js'));
    app.use('/chat', require('./chat.js'));
    
    app.get("/", (req, resp) => {
        resp.send("working");
    });
    
});


// global error handler
app.use(errorHandler);


var server = http.createServer(app);

// var io = socket.listen(server);  
// io.sockets.on('connection', function () {
//     console.log('hello world im a hot socket');
//     client.on('event', data => { console.log('i called' + data) });
//     client.on('disconnect', () => { /* … */ });
// });

// const io = require('socket.io')(server, {
//     cors: {
//         origin: "http://localhost:4200",
//         methods: ["GET", "POST"]
//         //withCredentials: false
//       }
// });


const io = require('socket.io')(server, {
    cors: {
        origin: "http://54.210.231.113:2000",
        methods: ["GET", "POST"],
        //allowedHeaders: [{"Access-Control-Allow-Headers": "Content-Type, Authorization",
         //"Access-Control-Allow-Origin": config.allowedOrigins,
         //"Access-Control-Allow-Credentials": true}],
        withCredentials: false
      }
});

io.on('connection', socket => {
    console.log('hello world im a hot socket');
    
    socket.on('updateChat', data => { 
        console.log('UPDATED FROM ANGULAR');
        io.emit('clientChatUpdate', '');
    });


    socket.on('disconnect', () => { console.log('im disconnect'); });
});

server.listen(2000, function(){
    console.log("Express server listening on port 2000");
});

// start server
// const server = httpServer.listen(2000, function () {
//     console.log('Server listening on port ' + 2000);
// });


function jwt() {
    const secret = config.jwtSecret;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/user/login',
            '/user/register'
        ]
    });
}

function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

