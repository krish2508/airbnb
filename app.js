const express=require('express');
const app=express();
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const Listing = require('./models/listing');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const LogInCollection = require("./models/user.js");
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
app.get("/signup", (req, res) => {
    res.render("auth/signup.ejs");
});
app.get("/", (req, res) => {
    res.render("auth/login.ejs");;
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    console.time("hash");
    const hashedPassword= await bcrypt.hash(data.password,10);
    console.timeEnd("hash");
    // console.log(hashedPassword);
    const newuser = await LogInCollection.create({ name: data.name, email: data.email, password: hashedPassword });
    if (!newuser) {
        return res.status(401).send("Problem in creating user");
    }
    res.status(201).render("auth/login.ejs");
});
app.post("/login", async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        if (!check){
            return res.status(401).send("user not found");
        }
        let pass=req.body.password;
        const Validuser=await bcrypt.compare(pass,check.password);
        if (!Validuser) {
            return res.status(401).send('not a valid user incorrect password');
        }
        
        return res.status(201).redirect("/listings");
    } catch (e) {
        res.status(401).send("wrong details");
    }
});
//Index Route
app.get('/listings',async (req,res)=>{
    const alllistings = await Listing.find();
    res.render("listings/index.ejs",{alllistings});
})
// new path
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
}
)

app.post('/listings',async(req,res)=>{
    let listing=new Listing(req.body.li);
    await listing.save();
    res.redirect('/listings');
})
//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let list= await Listing.findById(id);
    res.render("listings/show.ejs",{list});
    // console.log(list);

});
app.get('/listings/:id/edit',async (req,res)=>{
    let {id}=req.params;
    let list= await Listing.findById(id);
    res.render("listings/edit.ejs",{list});
});
app.put('/listings/:id',async(req,res)=>{
    let {id}=req.params;
    let list= await Listing.findByIdAndUpdate(id,{...req.body.li});
    console.log(req.body.li);
    res.redirect("/listings");

})
app.delete('/listings/:id',async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("app is listening");
})