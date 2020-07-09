'use strict'

var Bill = require('../models/bill.model');

function createBill(req, res){
    var params = req.body;
    var bill = new Bill();

    if(params.userId && params.date && params.cart){
            bill.date = params.date;
            bill.userId = params.userId;
            bill.cart = params.cart;
            bill.nit = params.nit;
            bill.total = params.total;
            bill.save((err, billSaved)=>{
                if(err){
                    res.send({message: 'Error en el sistema'});
                }else if(billSaved){ 
                    res.send({message: billSaved});
                }else{
                    res.send({message: 'Error al crear factura'})
                }
            });
}else{
    res.send({message: 'Ingrese todos los datos'});
}
}

function updateBill(req, res){
    var billId = req.params.id;
    var update = req.body;

    Bill.findByIdAndUpdate(billId, update, {new: true}, (err, updated)=>{
        if(err){
            res.status(500).send({message: 'Error general.'});
        }else if(update){
            res.send({bill: update});
        }else{
            res.status(418).send({message: 'No se ha podido actualizar la factura.'});
        }
    });
}

module.exports = {
    createBill,
    updateBill
}