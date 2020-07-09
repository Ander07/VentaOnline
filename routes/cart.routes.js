'use strict'

var express = require('express');
var api = express.Router();
var cartController = require('../controller/shoppingCart.controller');
var middlewere = require('../middlewares/authenticated');

api.post('/saveCart', cartController.saveCartUser);
api.put('/productsCart/:id', cartController.addProduct);
api.put('/buyProduct/:id', cartController.buyProducts);
api.put('/removeProduct/:id', cartController.removeProductCart);

module.exports = api;