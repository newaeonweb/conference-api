var express = require('express');
var router = express.Router();

var passport = require('passport');

// Home
router.get('/', function(req, res) {
    res.render('index.ejs');
});

// Profile
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Login
router.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

// Login Post
router.post('/login', passport.authenticate('local-login', {
    //Success go to Profile Page / Fail go to login page
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));

// Sign up
router.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));


// check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;