const mongoose = require('mongoose')


const employSchema =  new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }
})

module.exports = mongoose.model('Employ',employSchema)