const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://om12899:Vi6RPLUD40LISXBI@cluster0.22wap97.mongodb.net/users'
const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}

module.exports=connectToMongo