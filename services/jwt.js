'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'adminpass';

exports.createToken = (user)=>{
    var payLoad = {
        sub: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(10, "days").unix()
    };
    return jwt.encode(payLoad, key);    
}

