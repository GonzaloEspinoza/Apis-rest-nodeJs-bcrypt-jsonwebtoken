'use strict'
//

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan');




const app = express()

const port = process.env.PORT || 4050




//  middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));



//const service = require('./routes/api/v1.0')
const service = require('./routes/api/v0.1/services')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//RUTAS------servicios del api-rset 
app.use('/api/v1.0/',service)
app.use(service)





app.listen(port, () => {
    console.log(`Api-rest inmueble corriendo en ${port}`) 
}) 

module.exports = app