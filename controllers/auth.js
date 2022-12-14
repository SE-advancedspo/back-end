const express = require('express');
const User = require('../models/user'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const auth = async function(req, res) {
    let user = await User.findOne({username: req.body.username}).exec();
    if(!user) {
        res.json({success: false, message: 'Authentication failed. User not found'});
    }
    
    if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    }

    // if user is found and password is right create a token
    var payload = {
        email: user.email,
        username: user.username
        // other data encrypted in the token	
    }
    var options = {
        expiresIn: 86400 // expires in 24 hours
    }
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        email: user.email,
        username: user.username,
        self: "user/" + user._id
    });

}

/* Problem with undefined toke!! */
const tokenChecker = function(req, res, next) {
    // header or url parameters or post parameters
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) res.status(401).json({success:false,message:'No token provided.'})
    
    // decode token, verifies secret and checks expiration
    jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
        if (err) res.status(403).json({success:false,message:'Token not valid'})
        else {
        // if everything is good, save in req object for use in other routes
            //req.loggedUser = decoded;
            next();
        }
    });
};

module.exports = {
    auth,
    tokenChecker
};