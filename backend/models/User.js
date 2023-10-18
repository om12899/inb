const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    timestamp:{
        type : Date,
        default: Date.now
    }
})
const User  = mongoose.model('user', UserSchema)
User.createIndexes();
module.exports = User