'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'adminpass';

exports.ensureAuthAdmin = (req, res, next)=>{
    if(!req.headers.authorization){
            return res.status(500).send({message: 'Debe estar logueado para esta ruta.'});
    }else{
        var token = req.headers.authorization.replace(/["']+/g,'');
        try{
            var payLoad = jwt.decode(token, key);
            if(payLoad.exp <= moment.unix()){
                return res.status(401).send({message: 'Token expirado.'});
            }else if(payLoad.role != 'admin'){
                return res.status(401).send({message: 'No está autorizado hacia esta ruta.'});
            }
        }catch(ex){    
            return  res.status(404).send({message: 'Token no válido.',});
        }
        req.user = payLoad;
        next();
    }
}

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Debe estar logueado para entrar a esta ruta.'});
    }
    try{
        var token = jwt.decode(token, key)
        if(payLoad.exp <= moment.unix){
            return res.status(401).send({message: 'Token expirado'});
        }
    }catch(ex){
        return res.status(404).send({message: 'Token no válido'});
    }
    req.user = payLoad;
    next();
}