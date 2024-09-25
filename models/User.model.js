const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
         type:String,
         required:true,
         unique: true
          },
    firstName:{
        type:String,
        required:true,
        minlength:2
    },
        lastName :{
            type:String,
            required:true,
            minlength:2
        },

        password :{
            type:String,
            required:true,
            minlength:8

        },

        image:{
            type:String,
            default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg"
        }
})

const User = mongoose.model("User", userSchema)

module.exports = User