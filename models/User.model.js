const mongoose = require("mongoose")

//creamos el esquema

const userSchema = new mongoose.Schema({

  email : {type: String,  required:true,  unique: true},
  firstName : {type: String,  required:true, minlength:2},
  lastName : {type: String,  required:true, minlength:2},
  password : {type: String,  required:true, minlength:8},
  image : {type: String, default: "https://xsgames.co/randomusers/assets/avatars/pixel/44.jpg"},
  favorites : {type: [mongoose.Schema.Types.ObjectId ], ref: "Recipe", default:[]}

})
mongoose.Schema.Types.ObjectId


const User = mongoose.model("User", userSchema)


module.exports = User