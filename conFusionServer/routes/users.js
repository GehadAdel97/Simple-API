var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var User = require('../models/users');
var Verify = require('./verify');

userRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

userRouter.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

userRouter.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

userRouter.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye Bye ^_^'
  });
});

module.exports = userRouter;