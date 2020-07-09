'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriesSchema = Schema({
    nameCategory: String,
    products: [{type: Schema.Types.ObjectId, ref:'product'}]
});

module.exports = mongoose.model('categorie', categoriesSchema);

