const mongoose=require("mongoose");
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
        set:(v)=>v===""?"https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200":v,
    },
    price:Number,
    location:String,
    country:String
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;