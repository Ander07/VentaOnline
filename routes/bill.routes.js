'use strict'

var express = require('express');
var api = express.Router();
var billController = require('../controller/bill.controller');
var middlewereAuth = require('../middlewares/authenticated');


api.post('/bill', middlewereAuth.ensureAuthAdmin, billController.createBill);
api.put('/updateBill/:id', middlewereAuth.ensureAuthAdmin, billController.updateBill);

module.exports = api;