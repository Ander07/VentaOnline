'use strict'

var express = require('express');
var userController = require('../controller/users.controller');
var middlewere = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveUser', userController.saveUser);    
api.post('/userLogin', userController.login);
api.put('/userUpdate/:id',userController.updateUser);
api.delete('/userDelete/:id',userController.deleteUser);
api.get('/usersList', middlewere.ensureAuthAdmin, userController.listUsers);
api.get('/searchCategory', userController.searchCategory);
api.get('/searchProduct', userController.searchProduct);
api.put('/setBill/:id', userController.setBill);
api.put('/setBuy/:id', userController.setBuy);

module.exports = api;