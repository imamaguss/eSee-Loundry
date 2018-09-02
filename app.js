const express = require('express');
const app = express();
const flash = require('connect-flash');
const session = require('express-session')
const customer = require('./routes/customer')
const admin = require('./routes/admin')
const index = require('./routes/index')
const auth = require('./routes/auth')

app.set('view engine', 'ejs')
app.use(flash());
app.use(express.static(__dirname + "/public")); 
app.use(session({
    secret : "Bae joo hyun for love",
    resave : false,
    saveUninitialized : false
}));

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use(index)
app.use(auth)
app.use('/customer',customer)
app.use('/admin',admin)

app.listen(8080,function(){
    console.log('listening to port 8080')
})