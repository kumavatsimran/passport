const express=require('express');
const router=require('./routers/router')
const passport = require("passport");
const session = require("express-session");
const {localAuth}=require('./middlewar/Auth')
const app=express()

app.set("view engine", "ejs");

const path=require('path');
const Database = require('./config/database');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use("/upload/images",express.static('upload/images'))

localAuth(passport);
app.use(session({ secret: "private-key" }));
app.use(passport.initialize());
app.use(passport.session());


app.use(router)




app.listen(8081,(err)=>{
    Database();
    if(!err){
        console.log("server start http://loclhost:8081");
    }
})