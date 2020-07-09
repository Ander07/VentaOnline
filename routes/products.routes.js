'use strict'

var express = require('express');
var productController = require('../controller/products.controller');
var middlewere = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveProduct',middlewere.ensureAuthAdmin,productController.saveProduct);
api.put('/updateProduct/:id',middlewere.ensureAuthAdmin, productController.updateProduct);
api.delete('/deleteProduct/:id',middlewere.ensureAuthAdmin, productController.deleteProduct);
api.get('/listProducts', productController.listProducts);
api.get('/Agotados', productController.soldOut);
api.get('/masVendidos', productController.NoProductsA);

module.exports = api;