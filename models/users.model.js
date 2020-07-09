'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String,
    bill: [{type: Schema.Types.ObjectId, ref: 'bill'}],
    buys: [{type: Schema.Types.ObjectId, ref: 'cart'}]
});

module.exports = mongoose.model('user', userSchema);