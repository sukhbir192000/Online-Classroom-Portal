// Require Files
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const app = express();
const port = 8000;


const session = require('express-session');
const passport = require('passport');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);



app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(session({
    name: 'MISP',
    // TODO change the secret before deployment in production mode
    secret: 'oursecretkey',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));



app.set('view engine', 'ejs');
app.set('views', './views');


// Listen to server on port
app.listen(port,function(err){
    if(err){
        console.log(`Error in starting server ${err}`);
        return;
    }
    console.log("Server started successfully");
});