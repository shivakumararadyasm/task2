const express =  require('express');
const mongoose = require('mongoose');
const url =  'mongodb://localhost/EmployDBex'
const app = express()
const port = process.env.PORT || 9000 
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection


con.on('open', function(){
    console.log('connected...');
})

app.use(express.json())

const employRouter = require('./routes/employes')
app.use('/employes', employRouter)
app.listen(port, function(){
    console.log('Server started...')
})