const express=require('express');
const app=express();
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const LogInCollection = require("./models/user.js");
const listingRouter = require('./routes/listingRouters');
const authRouter=require('./routes/authRouters.js');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate);
main().then(()=>console.log("db connected successfully")).catch((err)=>console.log(err));
async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/projectce1');
}
app.use('/', authRouter);
app.use('/listings',listingRouter);
app.listen(8080,()=>{
    console.log("app is listening");
})