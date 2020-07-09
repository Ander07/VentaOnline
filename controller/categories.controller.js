'use strict'

var Category = require('../models/categories.model');
var Product = require('../models/products.model');

function saveCategory(req, res){
    var category = new Category();
    var params = req.body;

    if(params.nameCategory){
        Category.findOne({nameCategory: params.nameCategory}, (err, categoryFind)=>{
            if(err){
                res.status(500).send({message: 'Error general.'});
            }else if(categoryFind){
                res.send({message: 'Categoría ya registrada.'});
            }else{
                category.nameCategory = params.nameCategory;

                category.save((err, categorySaved)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }else if(categorySaved){
                        res.send({saved: categorySaved});
                    }else{
                        res.status(418).send({message: 'No se ha podido guardar la categoría.'});
                    }
                });
            }
        });
    }else{
        res.send({message: 'Ingresa un nombre para la categoría.'});
    }
    
}

function updateCategory(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(categoryId, update, {new: true}, (err, categoryUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(categoryUpdated){
            res.send({updated: categoryUpdated});
        }else{ 
            res.status(418).send({message: 'No se ha podido actualizar la categoría.'});
        }
    });
}

function removeCategory(req, res){
    var categoryId = req.params.id;
    var products = [];

    Category.findById(categoryId,(err, find)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else if(find){
            if(find.products.lenght != 0){
                products = find.products;
                Category.findOneAndUpdate({nameCategory: 'Otros'}, {$push: {products: products}},{new:true},(err, save)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el sistema'});
                    }else if(save){
                        Category.findByIdAndRemove(categoryId, (err, categoryRemoved)=>{
                            if(err){
                                res.status(500).send({message: 'Error en el sistema'});
                            }else if(categoryRemoved){
                                res.send({message: 'Categoria eliminada con exito', category: categoryRemoved, message: 'Productos envidos a:',save});
                            }else{
                                res.send({message: 'Error al eliminar Categoria'});
                            }
                        });
                    }else{
                        res.send({message:'Eror General'});
                    }
                });
            }
        }else{
            res.send({message: 'Error sistema'});
        }
    });  
}


function listCategories(req, res){
    Category.find({}, (err, listCategories)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(listCategories){
            res.send({categories: listCategories});
        }else{
            res.send({message: 'No existen categorías.'});
        }
    }).populate('products');
}

function setProduct(req, res){
    var categoryId = req.params.id;
    var params = req.body;

    if(params.idProduct){
        Category.findById(categoryId, (err, categoryFind)=>{
            if(err){
                res.status(500).send({message: 'Error general.'});
            }else if(categoryFind){ 
                Category.findByIdAndUpdate(categoryId, {$push:{products: params.idProduct}},{new: true},(err, categoryUpdated)=>{
                    if(err){
                        res.status(500).send({message: 'Error general.'});
                    }else if(categoryUpdated){
                        res.send({category: categoryUpdated});
                    }else{
                        res.status(418).send({message: 'Error al ingresar el producto.'});
                    }
                }).populate('products');
            }else{
                res.send({message: 'Categoria no encontrada.'});
            }
        });
    }else{
        res.send({message: 'Ingresa el id del producto.'});
    }
}



module.exports ={
    saveCategory,
    updateCategory,
    removeCategory,
    listCategories,
    setProduct
}