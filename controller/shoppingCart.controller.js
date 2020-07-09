'use strict'

var Cart = require('../models/shoppingCart.model');
var Product = require('../models/products.model');

function saveCartUser(req, res){
    var cart = new Cart();
    var params = req.body;

    if(params.userId){
        cart.userId = params.userId

        cart.save((err, cartSaved)=>{
            if(err){
                res.status(500).send({message: 'Error general.'});
            }else if(cartSaved){
                res.send({saved: cartSaved});
            }else{
                res.status(418).send({message: 'No se ha podido guardar el carrito de compras.'});
            }
        });
    }else{
        res.status(500).send({message: 'Debe asignar un usuario.'})
    }

}


function addProduct(req, res){
    let cartId = req.params.id;
    let params = req.body;
 
        if(params.idProduct){
            Cart.findById(cartId, (err, cartFind)=>{
                 if(err){
                     res.status(500).send({message: 'Error general.'});
                 }else if(cartFind){
                     Cart.findByIdAndUpdate(cartId, {$push: {products: params.idProduct}},{new: true}, (err, cartUpdated)=>{
                         if(err){
                             res.status(500).send({message: 'Error general.'});
                         }else if(cartUpdated){
                             res.send({cart: cartUpdated});
                         }else{
                             res.status(418).send({message: 'Error al actualizar.'});
                         }
                     }).populate('products');
                 }else{
                     res.status(404).send({message: 'Carrito no encontrada.'})
                 }
            });
        }else{
             res.send({message: 'Faltan datos.'});
        }
}

function removeProductCart(req, res){
    var cartId = req.params.id;
    var params = req.body;

    Cart.findById(cartId, (err, cartFind)=>{
        if(err){
            res.s(500).send({message: 'Error general.'});
        }else if(cartFind){
            Cart.findByIdAndUpdate(cartId, {$pull:{products: params.productId}},{new: true},(err, productRemove)=>{
                if(err){
                    res.status(500).send({message: 'Error general.'});
                }else if(productRemove){
                    res.send({removed: productRemove});
                }else{
                    res.status(418).send({message: 'Error al remover el producto de su carrito.'});
                }
            }).populate('products');
        }else{
            res.status(404).send({message: 'Carrito de compras no encontrado.'});
        }
    });
}

function buyProducts(req, res){
    let cartId = req.params.id;
    let params = req.body;
    var buyQuantity = params.quantity *(-1);

    Cart.findById(cartId, (err, cartFind)=>{
        if(err){
            res.status(500).send({message: 'Error general.1'});
        }else if(cartFind){
            
            Product.findOne({_id: params.productId}, (err, productFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general.2'});
                }else if(productFind){
                    Product.findOneAndUpdate({_id:params.productId},{$inc:{quantity: buyQuantity}},{new:true},(err, productUpdate)=>{
                        if(err){
                            res.status(500).send({message: 'Error general.3'});
                        }else if(productUpdate){
                            res.send({purchase: cartFind});
                        }else{
                            res.status(418).send({message: 'No se ha podido realizar la compra.'});
                        }
                    }).populate('products');
                }else{
                    res.send({message: 'No se encontró el producto.'});
                }
            });
        }else{
            res.send({message: 'Carrito no encontrado.'});
        }
    });
}

module.exports = {
    saveCartUser,
    addProduct,
    buyProducts,
    removeProductCart

}