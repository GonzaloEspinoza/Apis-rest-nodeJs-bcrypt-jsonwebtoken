'use strict'

const mongoose = require('mongoose');
const connect = require('../../../database/collections/connect');
const Registro= require('../../../database/collections/users');
const { verificaToken, verificaAadmin_role } = require('../../../middlewares/autentication');
 
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken'); 

const express = require('express');
const route = express.Router();






route.get('/',(req, res, next)=>{
    res.send({message: 'servidor corriendo'})
});



//resgidtro------
route.get('/signup', verificaToken, (req, res, next)=>{

});

route.post('/signup',(req, res, next)=>{

});

// update -----------
route.post('/update', [verificaToken, verificaAadmin_role],(erq, res, next) =>{

    res.status(400).json({
        ok: true,
        message: 'page update user'
    })

});




//login------------------

route.get('/login/:email=:password', (req, res) =>{
   

    let email =req.params.email
    let password=req.params.password

    console.log(email);
    console.log(password);


    Registro.findOne({email:email}, (err, usuarioDB)=>{
         
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    menssage: '(Usuario) o contraceña incorrectos'
                }
            });
        }
    
        if(!bcrypt.compareSync(password, usuarioDB.password)){
        
                return res.status(400).json({
                    ok: false,
                    err: {
                        menssage: 'Usuario o (contraceña) incorrectosS'
                    }
                });
        }


        // TOKEN --------
        let token = jwt.sign({
            usuario: usuarioDB
            
        },'secreeto-algo', {expiresIn: 60 * 60 * 24 * 30})

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token        // como el nombre de la es fgual tambien se puede escribir solo "token"
        });
    
    });

   

})
 




//registro--------------------
 
route.post('/registro',(req, res, next)=>{


    console.log('POST /api/registro')
    console.log(req.body)
    

    let registro = new Registro() 

    registro.email = req.body.email
    registro.role = req.body.role
    registro.password = bcrypt.hashSync(req.body.password, 10)


    Registro.findOne({'email':registro.email},(err,e)=>{
        if(e){
            console.log('email repetido')
            res.status(404).send({message:`Este email ${registro.email} ya se encuentra registrado`})
        }
        else{
            registro.save((err, usertStored) =>{
                if(err) {
                  res.status(404).send({messaje: `Error al salvar la base de datos:${err}`})
                 console.log(err)
                }
                res.status(200).send(usertStored)
            })
        }

    })      

});




//----verifica el token y despues lista todos los usuarios 

route.get('/users', verificaToken, (req, res)=>{
    
    return res.json({
        usuario: req.usuario,
        email: req.usuario.email,
        password: req.usuario.password,
        
    })

    Registro.find({}, (err, user) =>{

        if(err){
            return res.status(500).send({menssage: `Error en : ${err}` })
        }

        if(!user){
            return res.status(404). send({menssage: `Lista de usuarios vasica`})
        }

        return res.status(400).json({
            ok: false,
            err: {
                menssage: user
            }
        });

    })
});


module.exports = route;