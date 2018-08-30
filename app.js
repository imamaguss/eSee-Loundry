const express = require('express');
const app = express();
const customer = require('./routes/customer')
const admin = require('./routes/admin')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/customer',customer)
app.use('/admin',admin)

app.listen(8080,function(){
    console.log('listening to port 8080')
})