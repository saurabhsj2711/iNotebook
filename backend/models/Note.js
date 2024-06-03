const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const NoteSchema = new Schema({

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

    title:{
        type : String,
        required : true
    },
    desc:{
        type : String,
        required : true 
    },
    tag:{
        type : String,
        default : "General"
    },
    date:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('notes',NoteSchema)