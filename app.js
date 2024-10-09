const express=require('express');
const app=express();
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const LogInCollection = require("./models/user.js");
const {
    getAllListings,
    renderNewListingForm,
    createListing,
    showListing,
    renderEditListingForm,
    updateListing,
    deleteListing,
} = require('./controllers/listingController.js');
const{singupPage,loginPage,createUser,loginUser}=require("./controllers/authController.js");
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
app.get("/signup", singupPage);
app.get("/", loginPage);
app.post("/signup", createUser);
app.post("/login", loginUser);
const listingRouter=express.Router();
listingRouter.route('/').get(getAllListings).post(createListing);
listingRouter.route("/new").get(renderNewListingForm);
listingRouter.route("/:id").get(showListing).put(updateListing).delete(deleteListing);
listingRouter.route('/:id/edit').get(renderEditListingForm);
app.use('/listings',listingRouter);
app.listen(8080,()=>{
    console.log("app is listening");
})