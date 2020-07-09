'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var productsRoutes = require('./routes/products.routes');
var categoriesRoutes = require('./routes/categories.routes');
var usersRoutes = require('./routes/users.routes');
var cartRoutes = require('./routes/cart.routes');
var billRoutes = require('./routes/bill.routes');


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/shoppingCart', cartRoutes);
app.use('/bill', billRoutes);


module.exports = app;