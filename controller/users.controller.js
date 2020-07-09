'use strict'

var User = require('../models/users.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var Category = require('../models/categories.model');
var Product = require('../models/products.model');

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    if(params.name &&
        params.username &&
        params.email &&
        params.password){
            User.findOne({$or:[{username: params.username},{email: params.email}]}, (err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general.'});
                }else if(userFind){
                    res.send({message: 'Usuario y/o correo ya utilizado.'});
                }else{  
                    user.name = params.name;
                    user.username = params.username;
                    user.email = params.email;
                    user.password = params.password;
                    if(params.role){
                        user.role = params.role;
                    }else{
                        user.role = 'cliente'
                    }

                    bcrypt.hash(params.password, null, null, (err, hashPass)=>{
                        if(err){
                            res.status(500).send({message: 'Error de encriptación.'});
                        }else{
                            user.password = hashPass;

                            user.save((err, userSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general.'});
                                }else if(userSaved){
                                    res.send({saved: userSaved});
                                }else{
                                    res.status(418).send({message: 'No se ha podido guardar el usuario.'});
                                }
                            });
                        }
                    });
                }
            });
        }else{
            res.status(500).send({message: 'Llene todos los campos.'});
        }
}


function login(req, res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{username: params.username},{email: params.email}]},(err, userFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general.'});
                }else if(userFind){
                    bcrypt.compare(params.password, userFind.password,(err, checkPass)=>{
                        if(err){
                            res.status(404).send({message: 'Error al comparar contraseñas.'});
                        }else if(checkPass){
                            if(params.getToken){  
                                res.send({token: jwt.createToken(userFind)});   
                            }else{
                                res.send({user: userFind});
                            }
                        }else{
                            res.status(404).send({message: 'Contraseña incorrecta.'});
                        }
                    });
                }else{
                    res.status(418).send({message: 'No se ha encontrado el usuario.'});
                }
            }).populate('bill').populate('buys');
        }else{
            res.send({message: 'Ingrese la contraseña.'});
        }
    }else{
        res.send({message: 'Ingrese usuario o email.'});
    }
}

/*function updateUser(req, res){
    var update = req.body;
    var userId = req.params.id;

    if(req.user.role === 'admin' && userId) {
        User.findById(userId).exec((err, user) => {
            if(err) return res.status(500).send({message: 'Error general.'});
            if(!user) return res.status(404).send({ message: 'No se encontró el usuario.' });
            if(user.role === 'admin'){
                return res.status(400).send({message: 'Error de permisos, no puedes editar a un administrador.'});
            }else{
                User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }else if(userUpdated){
                        res.send({updated: userUpdated});
                    }else{
                        res.status(418).send({message: 'No se ha podido actualizar el usuario.'});
                    }
                });
            }
        });
    } else {
        User.findByIdAndUpdate(req.user.sub, update, {new: true}, (err, userUpdated)=>{
            if(err){
                res.send(500).send({message: 'Error general.'});
            }else if(userUpdated){
                res.send({updated: userUpdated});
            }else{
                res.status(418).send({message: 'No se ha podido actualizar.'});
            }
        });
    }
}

function deleteUser(req, res){
    var userId = req.params.id;

    if(req.user.role === 'admin' && userId) {
        User.findById(userId).exec((err, user) => {
            if(err) return res.status(500).send({message: 'Error general.'});
            if(!user) return res.status(404).send({ message: 'No se encontró el usuario.' });
            if(user.role === 'admin'){
                return res.status(400).send({message: 'Error de permisos.'});
            }else{
                User.findByIdAndDelete(userId, (err, userDeleted)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }else if(userDeleted){
                        res.send({deleted: userDeleted});
                    }else{
                        res.status(418).send({message: 'No se ha podido eliminar el usuario.'});
                    }
                });
            }
        });
    } else {
        User.findByIdAndDelete(req.user.sub, (err, userDeleted)=>{
            if(err){
                res.send(500).send({message: 'Error general.'});
            }else if(userDeleted){
                res.send({updated: userDeleted});
            }else{
                res.status(418).send({message: 'No se ha podido eliminar.'});
            }
        });
    }
}*/

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findById(userId, (err, userFind)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(userFind){
            User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error general.'});
                }else if(userUpdated){
                    res.send({updated: userUpdated});
                }else{
                    res.status(418).send({message: 'No se ha podido actualizar el usuario.'});
                }
            });
        }else{
            res.status(404).send({message: 'El usuario no existe.'});
        }
    });
}

function deleteUser(req, res){
    var userId = req.params.id;

    User.findById(userId,(err, userFind)=>{
        if(err){
        res.status(500).send({message: 'Error general'})
        }else if(userFind){
            User.findByIdAndDelete(userId, (err, userDeleted)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(userDeleted){
                    res.send({deleted: userDeleted});
                }else{
                    res.status(418).send({message: 'No se ha podido eliminar el usuario.'});
                }
            });
        }else{
            res.status(404).send({message: 'Usuario no encontrado.'});
        }
    });
}

function listUsers(req, res) {
    if(req.user.role == 'cliente') {
        User.find({role: 'cliente'}).exec((err, users) => {
            if(err) return res.status(500).send({message: 'Error en la peticion' })
            return res.status(200).send({message: 'No puedes acceder a esta ruta.'});
        })
    } else {
        User.find().exec((err, users) => {
            if(err) return res.status(500).send({ message: 'Error en la peticion' })
            return res.status(200).send({ users: users})
        })
    }
}

/*function searchCategory(req, res){
    var params = req.body;

    if(params.search){
    Category.find({nameCategory: params.search},(err, categoryFind)=>{
        if(err){
            res.status(500).send({message: 'Error general.',err});
        }else if(categoryFind){
            res.send({category: categoryFind});
        }else{
            res.send({message: 'No se encontró la categoría.'});
        }
    }).populate('products');
}else{
    res.send({message: 'Ingrese el nombre de la categoría.'});
}
}*/

function searchCategory(req, res) {
    const texto = req.body.search;

    Category.findOne({$or:[{'nameCategory':{ $regex: texto, $options: 'i'}}]}, (err, categories) => {
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(categories){
            res.status(200).send({categories: categories});
        }else{
            res.status(200).send({message: 'No existe ninguna cateogría con la información solicitada'});
        }
    }).populate('products');
}

function searchProduct(req, res){
    const texto = req.body.search;

    Product.findOne({$or:[{'nameProduct':{ $regex: texto, $options: 'i'}}]}, (err, products) => {
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(products){
            res.status(200).send({products: products});
        }else{
            res.status(200).send({message: 'No existe ningún producto con la información solicitada'});
        }
    });
}

function setBill(req, res){
    var userId = req.params.id;
    var params = req.body;

    if(params.idBill){
        User.findById(userId, (err, userFind)=>{
            if(err){
                res.status(500).send({message: 'Error general.1', err});
            }else if(userFind){ 
                User.findByIdAndUpdate(userId, {$push:{bill: params.idBill}},{new: true},(err, user)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }if(user){
                        res.send({user: user});
                    }else{
                        res.status(418).send({message: 'Error al ingresar factura.'});
                    }
                }).populate('bill');
            }else{
                res.send({message: 'Factura no encontrada.'});
            }
        });
    }else{
        res.send({message: 'Ingresa el id del la factura.'});
    }
}

function setBuy(req, res){
    var userId = req.params.id;
    var params = req.body;

    if(params.idCart){
        User.findById(userId, (err, userFind)=>{
            if(err){
                res.status(500).send({message: 'Error general.1', err});
            }else if(userFind){ 
                User.findByIdAndUpdate(userId, {$push:{buys: params.idCart}},{new: true},(err, user)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }if(user){
                        res.send({user: user});
                    }else{
                        res.status(418).send({message: 'Error al ingresar factura.'});
                    }
                }).populate('buys');
            }else{
                res.send({message: 'Factura no encontrada.'});
            }
        });
    }else{
        res.send({message: 'Ingresa el id del la compra.'});
    }
}


module.exports = {
    saveUser,
    login,
    updateUser,
    deleteUser,
    listUsers,
    searchCategory,
    searchProduct,
    setBill,
    setBuy
}