'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = Schema({
    nameProduct: String,
    tradeMark: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model('product', productsSchema);

