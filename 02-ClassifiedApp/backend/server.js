const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./config');
const sqlManager = require('./sql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());


sqlManager.connectDB(function (err) {
    if(err) {
        throw err;
    }
    console.log("Database connected");
    // api routes
    app.use('/user', require('./user.js'));
    app.use('/products', require('./products.js'));
});

// global error handler
app.use(errorHandler);

// start server
const server = app.listen(2000, function () {
    console.log('Server listening on port ' + 2000);
});

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
