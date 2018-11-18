'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email: String,
    password: String,
    role: String,
    signupDate: {type:Date, default:Date.now()}
});






module.exports = mongoose.model('User', UserSchema);