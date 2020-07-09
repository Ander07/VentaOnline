'use strict'

var Product = require('../models/products.model');

function saveProduct(req, res){
    var product = new Product();
    var params = req.body;
    
    if(params.nameProduct &&
        params.tradeMark &&
        params.price &&
        params.quantity){
        Product.findOne({nameProduct: params.nameProduct}, (err, productFind)=>{
            if(err){
                res.status(500).send({message: 'Error general.'});
            }else if(productFind){
                res.send({message: 'Producto ya registrado.'});
            }else{
                product.nameProduct = params.nameProduct;
                product.tradeMark = params.tradeMark;
                product.price = params.price;
                product.quantity = params.quantity;

                product.save((err, productSaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }else if(productSaved){
                        res.send({saved: productSaved});
                    }else{
                        res.status(418).send({message: 'No se ha podido guardar el producto.'});
                    }
                });
            }
        });
    }else{
        res.send({message: 'Debe llenar todos los campos.'});
    }
    
}

function updateProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update,{new: true}, (err, productUpdated)=>{
        if(err){
            res.status(500).send({message: 'Producto no encontrado.'});
        }else if(productUpdated){
             res.send({updated: productUpdated});
        }else{
            res.status(418).send({message: 'No se ha podido actualizar.'});
        }
    });
}

function deleteProduct(req, res){
    var productId = req.params.id;
    
    Product.findByIdAndDelete(productId, (err, productDeleted)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(productDeleted){
            res.send({deleted: productDeleted});
        }else{
            res.status(418).send({message: 'No se ha podido eliminar el producto'});
        }
    });
}

function listProducts(req, res){
    Product.find({}, (err, products)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(products){
            res.send({products: products});
        }else{
            res.send({message: 'No hay productos registrados.'});
        }
    });
}

function soldOut(req, res) {
    Product.find({}).exec((err, soldOut) => {
        if (err) {
            return res.status(500).send({message: 'Error general.'});
        } else {
            return res.status(200).send({soldOut: soldOut});
        }
    });
}

function NoProductsA(req, res) {
    Product.find({}).sort({quantity: +1}).exec((err, mostSales) => {
        if(err){
            return res.status(500).send({message: 'Error general.'});
        }else{
            return res.status(200).send({data: mostSales});
        }
    });
}

module.exports = {
    saveProduct,
    updateProduct,
    deleteProduct,
    listProducts,
    soldOut,
    NoProductsA
}