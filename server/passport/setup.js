const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.serializeUser((user, done) => {
    done(null,user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user)
    })
});

passport.use(new LocalStrategy({usernameField: "email"}, (email,password, done) => {
    User.findOne({email: email}).then(user => {

        // Create new user
        if(!user){
            const newUser = new User({email,password});

            // Hash password before saving to database
            bcrypt.genSalt(10,function(err,salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err) return done(err);

                    newUser.password = hash;

                    newUser.save().then(user => {
                        return done(null,user);
                    }).catch(err => {
                        return done(null, false, {message: err});
                    })
                })
            })
        } else {
            // Fetch other use
            
            //Compare passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) return done(err);
                
                if(isMatch){
                    return done(null,user);
                } else{
                    return done(null, false, {messsage: err});
                }
            })
        }
    })
}));

module.exports = passport;