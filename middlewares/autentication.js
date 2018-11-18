'use strict'
const jwt = require('jsonwebtoken'); 




//--------Verificar TOKEN---------------

let verificaToken = (req, res, next ) =>{

   

    let token = req.get('token');   // en ves de 'token' tambien puede ser 'Autorization' 
    jwt.verify(token, 'secreeto-algo', (err, decoded)=>{

        if(err){
            return res.status(401).json({
                ok: false,
                err: {message:'Token no valido'}
            })
        }

        req.usuario = decoded.usuario;
        next();
    })
    
};

let verificaAadmin_role = (req, res, next) =>{

    let usuario = req.usuario;
    if(usuario.role === 'admin'){

        next();
    }else{

        return res.json({
            ok: false,
            err: {
                message: 'el usuario no es admnistradorS'
            }
        })

    }

    

};


module.exports = { verificaToken, 
                 verificaAadmin_role };
