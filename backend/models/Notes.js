const mongoose  = require("mongoose");

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        unique: true,
        type: String,
    },
    tag:{
        type: String,
        default: "General"

    },
    timestamp:{
        type : Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', UserSchema)