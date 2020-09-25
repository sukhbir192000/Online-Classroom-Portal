const passport = require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const Crypto=require('crypto');
const User=require('../models/user');


passport.use(new googleStrategy({
    clientID:"75704553186-c30gg1ftusjbhqrqdv09sg80b85bk1de.apps.googleusercontent.com",
    clientSecret:"Ct0YGOYsEC9osxum8ddpHKEc",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refresh,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log(err);
                return;
            }
            else{
                console.log(profile);
                if(user){
                    return done(null,user);
                }
                else{
                    User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:Crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            return done(null,user);
                        }
                    })
                }
            }
        })
    }
));
passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});
// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;