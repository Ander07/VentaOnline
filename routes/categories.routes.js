'use strict'

var express = require('express');
var categoriesController = require('../controller/categories.controller');
var middlewere = require('../middlewares/authenticated');

var api = express();

api.post('/saveCategory',middlewere.ensureAuthAdmin, categoriesController.saveCategory);
api.put('/updateCategory/:id',middlewere.ensureAuthAdmin, categoriesController.updateCategory);  
api.put('/removeCategory/:id',middlewere.ensureAuthAdmin, categoriesController.removeCategory);
api.get('/listCategories', categoriesController.listCategories);
api.put('/setProduct/:id',middlewere.ensureAuthAdmin, categoriesController.setProduct); 
//api.get('/searchCategorie',categoriesController.searchCategory);

module.exports = api;