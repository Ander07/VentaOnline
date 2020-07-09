'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = Schema({
    userId: [{type: Schema.Types.ObjectId, ref: 'user'}],
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
    quantity: Number
});

module.exports = mongoose.model('cart', cartSchema);

