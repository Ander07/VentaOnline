'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = Schema({
    date: Date,
    userId: [{type: Schema.Types.ObjectId, ref: 'users'}],
    cart: [{type: Schema.Types.ObjectId, ref: 'carts'}],
    nit: String,
    total: Number

});

module.exports = mongoose.model('bill', billSchema);