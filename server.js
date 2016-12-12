var express = require('express');
var app = express();
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

app.use(session({
        //secret: process.env.SESSION_SECRET,
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require ("./test/app.js")(app);
require("./assignment/app.js")(app);


//var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.set('ipaddress', (process.env.IP));
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), app.get('ipaddress'));

//app.listen(port, ipaddress);
