const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username:{
        type:String,required:true
    },
    email:{
        type:String, required:true
    },
    password:{
        type:String, required:true
    }
})

mongoose.models ={}

const registeredUser =  mongoose.model.users ||  mongoose.model('users' , user) 

module.exports = registeredUser;